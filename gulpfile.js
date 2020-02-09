let gulp = require('gulp'),
autoprefixer = require('gulp-autoprefixer'),
concat = require('gulp-concat'),
cleanCSS  = require('gulp-clean-css'),
rename = require('gulp-rename'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
log = require('fancy-log'),
nunjucksRender = require('gulp-nunjucks-render');



let sasssMainFile = 'app/scss/index.scss';
let sassFiles = 'app/scss/**/*.scss';
let njkFiles = 'app/**/*.html';

gulp.task('scss', function () {
log('Generate CSS files ' + (new Date()).toString());
gulp.src(sasssMainFile)
    .pipe(sourcemaps.init())
    .pipe(sass({
        style: 'compressed',
        includePaths: ['./node_modules/']
    }))
    .pipe(autoprefixer('last 3 version', 'ie >= 9'))
    .pipe(concat('index.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/resources/css'));
});

gulp.task('scss-prod', function () {
log('Generate CSS files ' + (new Date()).toString());
gulp.src(sasssMainFile)
    .pipe(sass({ style: 'compressed' }))
    .pipe(autoprefixer('last 3 version', 'ie >= 9'))
    .pipe(concat('index.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/resources/css'));
});

gulp.task('nunjucks', function () {
// Gets .html and .nunjucks files in pages
return gulp.src('app/pages/**/*.+(html|njk)')
    // Renders template with nunjucks
    .pipe(nunjucksRender({
        path: ['app/templates']
    }))
    // output files in dist folder
    .pipe(gulp.dest('dist'))
});


gulp.task('watch', function () {
log('Watching scss, js and nunjucks files for modifications');
gulp.watch(sassFiles, ['sass']);
gulp.watch(njkFiles, ['nunjucks']);
});

gulp.task('default', ['watch']);