// Compiling Assets (Laravel Mix)
// https://laravel.com/docs/5.6/mix

const { join, resolve } = require('path')
const mix = require('laravel-mix')
const { GenerateSW } = require('workbox-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const pkg = require('./package.json')
const destPath = join(__dirname, 'assets')
const destCss = mix.inProduction() ? `./src/_includes/css` : './src'

mix
  .js('./src/_scripts/main.js', `${destPath}/src/scripts`) // https://laravel.com/docs/5.6/mix#working-with-scripts
  .stylus('./src/_stylus/main.styl', `${destCss}/bundle.css`, {
    use: [
      require('rupture')()
    ]
  }) // https://laravel.com/docs/5.6/mix#sass
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
      '@': resolve(__dirname, 'src', '_scripts')
    }
  }
})

if (mix.inProduction()) {
  mix.webpackConfig({
    plugins: [
      new GenerateSW({ // eslint-disable-line
        cacheId: `${pkg.name}`,
        swDest: join(`${__dirname}`, 'src', 'sw.js'),
        precacheManifestFilename: join(`${__dirname}`, 'src', 'wb-manifest.[manifestHash].js'),
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [{
          urlPattern: new RegExp(`${pkg.homepage}`),
          handler: 'networkFirst',
          options: {
            cacheName: `${pkg.name}-${pkg.version}`
          }
        }, {
          urlPattern: new RegExp('https://fonts.(googleapis|gstatic).com'),
          handler: 'cacheFirst',
          options: {
            cacheName: 'google-fonts'
          }
        }]
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: join(`${__dirname}`, 'src', 'webpack-report.html'),
        openAnalyzer: false,
        logLevel: 'silent'
      })
    ]
  })
}
