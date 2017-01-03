var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    server = require('gulp-webserver'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    concat = require('gulp-concat');

var paths = {
    less: './src/less',
    css_build: './dist/css',
    js: './src/js',
    js_build: './dist/js'
};

gulp.task('less', function () {
    gulp.src(paths.less + '/app.less')
        .pipe(less())
        .pipe(gulp.dest(paths.css_build));
});
gulp.task('minify', function () {
    gulp.src(paths.css_build + '/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest(paths.css_build));
});
gulp.task('concat', function () {
    gulp.src(paths.js + '/*.js')
        .pipe(concat('app_concat.js'))
        .pipe(gulp.dest(paths.js_build));
});
gulp.task('server', function () {
    gulp.src('./')
        .pipe(server(
            {
                livereload: true,
                open: true
            }
        ));
});
gulp.task('browserify', function () {
    browserify({
            entries: [paths.js_build + '/app_concat.js']
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(paths.js_build));
});

gulp.task('default', ['server', 'less', 'concat', 'browserify'], function() {
    gulp.watch(paths.less + '/*.less', ['less']);
    gulp.watch(paths.js + '/*.js', ['concat', 'browserify']);
});
