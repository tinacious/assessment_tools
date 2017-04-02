'use strict';

const path = require('path');

const argv = require('yargs').argv;
const gulp = require('gulp');
const htmlValidator = require('gulp-html-validator');
const cssValidator = require('gulp-w3c-css');
const rename = require('gulp-rename');
const folders = require('gulp-folders');

let projectSourceDir = argv.path;

gulp.task('validate_html', folders(projectSourceDir, function (folder) {
    return gulp.src(path.join(projectSourceDir, folder, '**/*.html'))
        .pipe(htmlValidator({ format: 'text' }))
        .pipe(rename(folder + '-html.txt'))
        .pipe(gulp.dest('./validation_output'));
}));

gulp.task('validate_css', folders(projectSourceDir, function (folder) {
    return gulp.src(path.join(projectSourceDir, folder, '**/*.css'))
        .pipe(cssValidator())
        .pipe(rename(folder + '-css.txt'))
        .pipe(gulp.dest('./validation_output'));
}));

gulp.task('default', [
    'validate_html'
]);
