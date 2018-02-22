var gulp = require('gulp');
var sass = require('gulp-sass');

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

//WATCHING
//------------------------------------------
// Single watch
// gulp.watch('app/scss/**/*.scss', ['sass']);

// Multiple watch
gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	//Whatever other files I want to watch
});

// AUTOMATIC BROWSER RELOAD
//------------------------------------------
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	});
});

// Update sass task to allow browserSync to update CSS
gulp.task('sass', function() {
	return gulp.src('app/css/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});