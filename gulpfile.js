var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('./src/styles/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/styles/css'));
});

gulp.task('watch', function () {
    gulp.watch('./src/styles/scss/**/*.scss', ['sass']);
});