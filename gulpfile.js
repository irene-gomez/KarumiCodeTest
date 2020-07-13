const gulp = require('gulp');
const config = require('./config.json');
const htmlInclude = require('gulp-html-tag-include');
const browserSync = require('browser-sync');
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');

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

gulp.task('images', done => {
	gulp
		.src(config.images.src)
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(gulp.dest(config.images.dest));
	done();
});

gulp.task('css', done => {
	gulp
		.src(config.css.src)
		.pipe(sourcemaps.init())
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(sass({ outputStyle: 'extended' }))
		.pipe(autoprefixer({ cascade: false }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.css.dest))
		.pipe(browserSync.reload({ stream: true }));
	done();
});

gulp.task('css-dist', done => {
	gulp
		.src(config.css.src)
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(autoprefixer({ cascade: false }))
		.pipe(gulp.dest(config.css.dist));
	done();
});

gulp.task('images-dist', done => {
	gulp
		.src(config.images.src)
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(gulp.dest(config.images.dist));
	done();
});

gulp.task('js', done => {
	gulp
		.src(config.js.src)
		.pipe(sourcemaps.init())
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(concat('main.js'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.js.dest))
		.pipe(browserSync.reload({ stream: true }));
	done();
});

gulp.task('js-dist', done => {
	gulp
		.src(config.js.src)
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest(config.js.dist));
	done();
});

gulp.task('default',
	gulp.series(['clean', 'html', 'css', 'images', 'js'], done => {
		browserSync.init({ server: { baseDir: './public/' } });
		gulp.watch(config.watch.html, gulp.series(['html', 'bs-reload']));
		gulp.watch(config.css.src, gulp.series('css'));
		gulp.watch(config.images.src, gulp.series(['images', 'bs-reload']));
		gulp.watch(config.js.src, gulp.series(['js', 'bs-reload']));
		done();
	})
);

gulp.task('docs',
	gulp.series(
		[
			'clean-dist',
			'html-dist',
			'css-dist',
			'images-dist',
			'js-dist',
		],
		done => done()
	)
);