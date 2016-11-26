let gulp = require("gulp");

gulp.task("default", function () {
  return gulp.src("./src/**/*.js")
    .pipe(gulp.dest("./dist"));
});