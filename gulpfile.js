var gulp = require('gulp');
var babel = require('gulp-babel');
//构建任务
gulp.task('build', function(){
  //这里是将script文件下的js转换为ES5，并添加到dist文件夹中
  gulp.src('src/**/*.js')
    .pipe(babel({
      "plugins": ["transform-class-properties"],
      "presets": ["stage-0", "es2015", "react"]
    }))
    .pipe(gulp.dest('lib'));
});