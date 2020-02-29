const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
   .setResourceRoot('./')
   .js('www/src/js/index.js', 'www/dist/js/bundle.js')
   .sass('www/src/sass/app.scss', 'www/dist/css')
   .sass('www/src/sass/mdi.scss', 'www/dist/css')
   // .options({
   //    processCssUrls: false
   // })
   // .sourceMaps()
   .setPublicPath('www/dist/css')
   ;



   
