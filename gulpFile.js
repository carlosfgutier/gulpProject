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


// General input to specific output
//------------------------------------------
gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass()) //using gulp sass
	.pipe(gulp.dest('app/css'))
});