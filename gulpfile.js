// Start of requirement declarations //
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var cache = require('gulp-cache');
var cssnano = require('gulp-cssnano');
var del = require('del');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
// End of requirement declarations //

// Start of individual tasks //
gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: 'src'
        },
    });
});

gulp.task('cache:clear', (callback) => {
    return cache.clearAll(callback);
});

gulp.task('clean:dist', () => {
    return del.sync('dist');
});

gulp.task('fonts', () => {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', () => {
    return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('sass', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', (err) => {
            console.error.bind(console);
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('useref', () => {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', babel({
            presets: ['es2015']
        })))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});
// End of individual tasks //


// Start of grouped tasks //
gulp.task('build', (callback) => {
    runSequence('clean:dist', ['sass', 'useref', 'images', 'fonts'],
        callback
    );
});

gulp.task('default', (callback) => {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    );
});

gulp.task('watch', ['browserSync', 'sass'], () => {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/*.html', browserSync.reload);
    //gulp.watch('src/js/**/*.js', browserSync.reload);
});
// End of grouped tasks //