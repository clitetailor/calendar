let gulp = require("gulp");

gulp.task("default", ["template"], function () {
  return gulp.src("./src/**/*.js")
    .pipe(gulp.dest("./dist"));
});

gulp.task("template", function () {
  return gulp.src("./src/index.html")
    .pipe(gulp.dest("./dist"));
});