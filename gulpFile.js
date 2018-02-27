var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
//to optimize
var useref = require('gulp-useref');
//to minimize js
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
//to minimize css
var cssnano = require('gulp-cssnano');

gulp.task('hello', function() {
	console.log("Hello Carlos");
});

// Direct sass input-output
//------------------------------------------
// gulp.task('sass', function() {
// 	return gulp.src('app/scss/styles.scss')
// 	.pipe(sass()) //using gulp sass
// 	.pipe(gulp.dest('app/css'))
// });

// GLOBBS
// General input to specific output
//------------------------------------------
// gulp.task('sass', function() {
// 	return gulp.src('app/scss/**/*.scss')
// 	.pipe(sass())
// 	.pipe(gulp.dest('app/css'))
// });

// AUTOMATIC BROWSER RELOAD
//------------------------------------------
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
});

// Update sass task to allow browserSync to update CSS
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
  	.pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//WATCHING
//------------------------------------------
// Single watch
// gulp.watch('app/scss/**/*.scss', ['sass']);

// Multiple watch
gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reaload);
	//Whatever other files I want to watch
});

// Concatenate js files
gulp.task('useref', function() {
	return gulp.src('app/*.html')
	.pipe(useref())
	//to minify only if its a js file
	.pipe(gulpIf('*.js', uglify()))
	//to minify only if its a css file
	.pipe(gulpIf('*.css', cssnano()))
	.pipe(gulp.dest('dist'))
});
