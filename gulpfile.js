const gulp = require('gulp');
const config = require('./config.json');
const htmlInclude = require('gulp-html-tag-include');
const browserSync = require('browser-sync');
const del = require('del');

gulp.task('bs-reload', done => {
    browserSync.reload();
    done();
});

gulp.task('clean', del.bind(null, [config.env.dev.dest]));

gulp.task('clean-dist', del.bind(null, [config.env.producction.dest]));

gulp.task('html', done => {
    gulp.src(config.html.src).pipe(htmlInclude()).pipe(gulp.dest(config.html.dest));
    done();
});

gulp.task('html-dist', done => {
    gulp.src(config.html.src).pipe(htmlInclude()).pipe(gulp.dest(config.html.dist));
    done();
});

gulp.task('default',
    gulp.series(['clean', 'html'], done => {
        browserSync.init({ server: { baseDir: './public/' } });
        gulp.watch(config.watch.html, gulp.series(['html', 'bs-reload']));
        done();
    })
);

gulp.task('docs',
    gulp.series(
        [
            'clean-dist',
            'html-dist',
        ],
        done => done()
    )
);