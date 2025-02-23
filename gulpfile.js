//gulpfile.js

var { gulp, src, dest, watch, series } = require('gulp');
var sass = require('gulp-sass')(require("sass"));

// require the module as normal
var bs = require("browser-sync").create();




//style paths
var sassFiles = './src/styles/scss/**/*.scss',
    cssDest = './dist/css/',
    jsFiles = 'src/js/**/*.js',
    htmlFile = 'index.html',
    imageFiles = 'src/assets/**/*'

async function stylesTask() {
    src("./src/styles/scss/all.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(cssDest));
}
async function imagesTask() {
    src("./src/assets/icons/*.svg")
        .pipe(dest("./dist/img"));
}
async function javaScriptTask() {
    src(jsFiles)
        .pipe(dest("./dist/js"));
}

async function htmlTask() {
    src(htmlFile)
        .pipe(dest("./dist"));
}

async function watchSass() {
    // .init starts the server
    bs.init({
        //The files to respond to when they change
        server: "./dist",
        files: ["./dist/css/**","./dist/js/**","./dist/index.html"]
    });
    // Now call methods on bs instead of the
    // main browserSync module export
    watch(imageFiles, imagesTask)
    watch(sassFiles, stylesTask)
    watch(jsFiles, javaScriptTask)
    watch(htmlFile, htmlTask)
}

  
exports.default = series(imagesTask, javaScriptTask, htmlTask, stylesTask)
exports.watch = watchSass