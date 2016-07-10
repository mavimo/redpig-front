var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('jade', function(){
    gulp.src('*.jade')
        .pipe(plugins.jade({pretty:true}))
        .pipe(gulp.dest(''));

    return gulp.src('src/**/*.jade')
            .pipe(plugins.jade({pretty:true}))
            .pipe(gulp.dest('src'));
});

gulp.task('js', function(){
    return gulp.src('src/**/*.coffee')
            .pipe(plugins.coffee({bare:true}))
            .pipe(gulp.dest('src'))
});

gulp.task('build', ['jade', 'js']);

gulp.task('default', function(){
    plugins.livereload.listen(35728);
    console.log('port:35728');


    var changed = [];

    gulp.watch(["src/**/*.jade", "index.jade"], ['jade', pop]).on('change', push);
    
    gulp.watch('src/**/*.coffee', ['js', pop]).on('change',push);

    // gulp.watch("src/**/*.less", ['less', pop]).on('change', push);


    function push(s) {
        changed.push(s);
    }

    function pop() {
        while (changed.length > 0) {
            var s = changed.pop();
            console.log(s);
            plugins.livereload.changed(s);
        }
    }
});