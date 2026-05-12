// gulpfile.js
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const path = require('path');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const rename = require('gulp-rename');

// Paths
const paths = {
    scss: path.resolve(__dirname, 'app/theme/client/default/scss/**/*.scss'),
    css: path.resolve(__dirname, 'app/static/css'),
    js: path.resolve(__dirname, 'app/static/*.js'),
    jsDest: path.resolve(__dirname, 'app/static/min')
};

// Compile SCSS to CSS
gulp.task('compile-scss', function () {
    return gulp.src(paths.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.css));
});

// Minify CSS
gulp.task('minify-css', function () {
    return gulp.src([`${paths.css}/*.css`, `!${paths.css}/*.min.css`])
        .pipe(cleanCSS({ compatibility: 'ie11' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.css));
});

// Minify JS
gulp.task('minify-js', function () {
    return gulp.src(paths.js, { allowEmpty: true }) // won't fail if file missing
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.jsDest));
});

// Watch SCSS files
gulp.task('watch-scss', function () {
    gulp.watch(paths.scss, gulp.series('compile-scss', 'minify-css'));
});

// Default task
gulp.task('default', gulp.series(
    'compile-scss',
    'minify-css',
    gulp.parallel('minify-js', 'watch-scss')
));
