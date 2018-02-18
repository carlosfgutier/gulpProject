var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('hello', function() {
	console.log("Hello Carlos");
});

gulp.task('sass', function() {
	return gulp.src('source-files')
	.pipe(sass()) //using gulp sass
	.pipe(gulp.dest('destination'))
});