var gulp = require('gulp');
var babel = require('gulp-babel');
var gulpRename = require("gulp-rename");
var gulpClean = require('gulp-clean');

gulp.task('clean', function () {
	return gulp.src('react-eflow-build', {read: false})
		.pipe(gulpClean());
});

//构建任务
gulp.task('transform', ['clean'], function(){
  //这里是将script文件下的js转换为ES5，并添加到dist文件夹中
  gulp.src('src/**/*.js')
    .pipe(babel({
      "plugins": ["transform-class-properties"],
      "presets": ["stage-0", "es2015", "react"]
    }))
    .pipe(gulp.dest('lib'));
});

gulp.task('copy', ['transform'], function(){
  gulp.src(['src/eflow.d.ts'])
    .pipe(gulp.dest("./lib"));

  gulp.src(['package.json', 'README.md', 'lib/**/*', 'src/**/*'], {base:"."})
    .pipe(gulp.dest('../react-eflow-build'));
});

gulp.task('default', ['copy'], function(){

  gulp.src(['src/eflow.d.ts'])
    .pipe(gulpRename('index.d.ts'))
    .pipe(gulp.dest("../react-eflow-build"));
});