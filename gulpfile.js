var babelify = require('babelify');
var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var config = {
    port: 1337,
    devBaseUrl: 'http://localhost',
    paths: {
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/toastr/build/toastr.css',
            './src/css/**/*.css'
        ],
        html: './src/*.html',
        images: './src/images/**/*.*',
        js: './src/**/*.js',
        jsx: './src/**/*.jsx',
        dist: './dist',
        mainJs: './src/app.jsx'
    }
};

gulp.task('server', function(){
    return connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('js', function(){
    return browserify(config.paths.mainJs)
        .transform(babelify)
        .bundle()
        .on('error', handleErrors)
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.paths.dist + '/js'))
        .pipe(connect.reload());
});

gulp.task('html', function(){
    return gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('images', function(){
    return gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'));
});

gulp.task('css', function(){
    return gulp.src(config.paths.css)
        .pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(connect.reload());
});

gulp.task('watch', function(){
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js']);
    gulp.watch(config.paths.jsx, ['js']);
    gulp.watch(config.paths.css, ['css']);
});

gulp.task('dev', ['html', 'js', 'css', 'images', 'server', 'watch']);


function handleErrors(err){
    console.log(err);
    this.emit('end');
}

