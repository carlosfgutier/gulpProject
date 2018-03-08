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
//to optimize images
var imagemin = require('gulp-imagemin');
//to save image cache and avoid repeating image optimization
var cache = require('gulp-cache');
//to clean, delete files that re no longer in used
var del = require('del');
//to run tasks in a specific order rather than all at once
var runSequence = require('run-sequence');

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

// AUTOMATIC BROWSER RELOAD AND FILE GENERATION
//------------------------------------------
// BrowserSync Task
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

gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
});

// Image optimize task
gulp.task('images', function() {
	return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
	.pipe(cache(imagemin({
		//to create interlaced gifs or customize how files are optimzed
		interlaced: true
	})))
	.pipe(gulp.dest('dist/images'))
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
	.pipe(gulp.dest('dist'));
});

//CLEANING
//------------------------------------------
gulp.task('clean:dist', function() {
	return del.sync('dist');
});

gulp.task('build', function() {
	runSequence('clean:dist',
	['sass', 'useref', 'images', 'fonts'], 
	callback
	)
});

// Does same as 'watch' but run by simply typing the command gulp
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})
