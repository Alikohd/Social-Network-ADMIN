import gulp from 'gulp';
import del from 'del';
import pug from 'gulp-pug';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import babel from 'gulp-babel';
import replace from 'gulp-replace';
import nodeSass from 'node-sass';

const sass = gulpSass(nodeSass);

const clean = () => del(['dist']);

const scripts = () => {
  return gulp
      .src('src/js/**/*.js')
      .pipe(babel({
        presets: ['@babel/preset-env']
      }))
      .pipe(gulp.dest('dist/js'));
};

const views = () => {
    return gulp
        .src('src/views/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist/html'));
};

const styles = () => {
  return gulp
      .src('src/scss/**/*.scss')
      .pipe(sass())
      .pipe(cleanCSS())
      .pipe(gulp.dest('dist/css'));
};

const replaceStyles = () => {
  return gulp
      .src('dist/html/**/*.html')
      .pipe(replace(/<link href="..\/scss\/layout.scss"/g, '<link href="../css/layout.css"'))
      .pipe(gulp.dest('dist/html'));
};

const watch = () => {
  gulp.watch('src/js/**/*.js', scripts);
  gulp.watch('src/scss/**/*.scss', styles);
  gulp.watch('src/views/**/*.pug', views);
};

const build = gulp.series(clean, gulp.parallel(scripts, views, styles), replaceStyles);
const dev = gulp.series(build, watch);

export { clean, scripts, views, styles, build, dev };
export default dev;