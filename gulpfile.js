var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gulputil = require('gulp-util');
var rename = require('gulp-rename');
var sass = require('gulp-sass')(require('sass'));
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

function do_scss( src ) {
	var dir = src.substring( 0, src.lastIndexOf('/') );
	return gulp.src( './src/scss/' + src + '.scss' )
		.pipe( sourcemaps.init() )
		.pipe( sass( { outputStyle: 'compressed' } ).on('error', sass.logError) )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( './css/' + dir ) )
        .pipe( sass( { outputStyle: 'compressed' } ).on('error', sass.logError) )
		.pipe( rename( { suffix: '.dev' } ) )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( './css/' + dir ) );

}

function do_js( src ) {
	var dir = src.substring( 0, src.lastIndexOf('/') );
	return gulp.src( './src/js/' + src + '.js' )
		.pipe( sourcemaps.init() )
		.pipe( gulp.dest( './js/' + dir ) )
		.pipe( uglify() )
		.pipe( rename( { suffix: '.dev' } ) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( './js/' + dir ) );
}

function concat_js( src, dest ) {
	return gulp.src( src )
		.pipe( sourcemaps.init() )
		.pipe( uglify() )
		.pipe( concat( dest ) )
		.pipe( gulp.dest( './js/' ) )
		.pipe( rename( { suffix: '.dev' } ) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( './js/' ) );

}


gulp.task('js:frontend', function(){
	return do_js('index')
});
gulp.task('js:admin', function(){
	return do_js('admin/index')
});
gulp.task('js',gulp.parallel('js:frontend','js:admin'));

// scss
gulp.task('scss:frontend', function(){
	return do_scss('index')
});
gulp.task('scss:admin', function(){
	return do_scss('admin/index')
});

gulp.task('scss',gulp.parallel('scss:frontend','scss:admin'));


gulp.task('build', gulp.parallel('scss','js') );

gulp.task('watch', function() {
	// place code for your default task here
	gulp.watch('./src/scss/**/*.scss',gulp.parallel( 'scss' ));
	gulp.watch('./src/js/**/*.js',gulp.parallel( 'js' ) );
});

gulp.task('dev', gulp.parallel('build','watch'));

gulp.task('default',cb => {
	console.log('run either `gulp build` or `gulp dev`');
	cb();
});
