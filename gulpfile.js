var gulp = require('gulp')
    , spawn = require('child_process').spawn
    , less = require('gulp-less')
    , concat = require('gulp-concat')
    , symlink = require('gulp-symlink')
    , node

var paths = {
    less: './public/stylesheets/**/*.less',
    stylesheets: './public/stylesheets',
    server: ['index.js']
}

gulp.task('less', function () {
    gulp.src(paths.less)
        .pipe(concat('style.less'))
        .pipe(less('style.css'))
        .pipe(gulp.dest(paths.stylesheets));
});

gulp.task('server', function () {
    if (node) node.kill()
    node = spawn('node', paths.server, {stdio: 'inherit'})
    node.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(paths.less, ['less']);
    gulp.watch(paths.server, ['server']);
});

gulp.task('build', function () {
    return gulp.run('less');
});

gulp.task('hook', function () {
    return gulp.src('.pre-commit')
        .pipe(symlink('.git/hooks/', 'pre-commit'));
});

gulp.task('default', function () {
    gulp.run('hook');
    gulp.run('less');
    gulp.run('server');
    gulp.run('watch');
});

process.on('exit', function () {
    if (node) {
        node.kill();
    }
});