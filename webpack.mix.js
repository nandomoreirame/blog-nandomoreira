// Compiling Assets (Laravel Mix)
// https://laravel.com/docs/5.6/mix

const { join, resolve } = require('path')
const mix = require('laravel-mix')
const { GenerateSW } = require('workbox-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const pkg = require('./package.json')
const srcPath = join(__dirname, './')
const destPath = join(srcPath, 'assets')
const destCss = mix.inProduction() ? join(srcPath, '_includes') : srcPath

mix
  .js(`${srcPath}/_scripts/main.js`, `${destPath}/scripts`) // https://laravel.com/docs/5.6/mix#working-with-scripts
  .sass(`${srcPath}/_sass/main.sass`, `${destCss}/bundle.css`, {
    precision: 5
  }) // https://laravel.com/docs/5.6/mix#sass
  .copy('node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css', `${destPath}/css/fancybox.css`)
  .extract(['vue', 'jquery', 'moment']) // https://laravel.com/docs/5.6/mix#vendor-extraction
  .options({
    extractVueStyles: true,
    processCssUrls: true,
    uglify: {},
    purifyCss: false,
    postCss: [require('autoprefixer')],
    clearConsole: false
  })
  .disableNotifications() // https://laravel.com/docs/5.6/mix#notifications

mix.autoload({
  'jquery': ['$', 'window.jQuery', 'jQuery'],
  'vue': ['Vue', 'window.Vue'],
  'moment': ['moment', 'window.moment']
})

mix.webpackConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, '_scripts')
    }
  }
})

if (mix.inProduction()) {
  mix.webpackConfig({
    plugins: [
      new GenerateSW({ // eslint-disable-line
        cacheId: `${pkg.name}`,
        swDest: join(`${__dirname}`, 'sw.js'),
        precacheManifestFilename: join(`${__dirname}`, 'wb-manifest.[manifestHash].js'),
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [{
          urlPattern: new RegExp(`${pkg.homepage}`),
          handler: 'networkFirst',
          options: { cacheName: `${pkg.name}-${pkg.version}` }
        }, {
          urlPattern: new RegExp('https://fonts.(googleapis|gstatic).com'),
          handler: 'cacheFirst',
          options: { cacheName: 'google-fonts' }
        }]
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: join(`${__dirname}`, 'webpack-report.html'),
        openAnalyzer: false,
        logLevel: 'silent'
      })
    ]
  })
}
