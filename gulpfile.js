var gulp = require('gulp');
var pug = require('gulp-pug');
var fs = require("fs");
var path = require('path');
var data = require('gulp-data');
var es = require('event-stream');

gulp.task('default', ['views']);

gulp.task('views', function buildHTML() {
  fs.readdir(__dirname + '/drafts', function(error, notes){
    notes = notes.map(function(d){
      return d.replace(".pug", "").replace("-", ".").replace("-", ".").replace("-", " // ").toLowerCase();
    });

    return es.concat(gulp.src(['index.pug'])
      .pipe(data(function (file){
        return {
          "data": notes
        };
      }))
      .pipe(pug())
      .pipe(gulp.dest('./')),
    gulp.src(['drafts/*.pug'])
      .pipe(pug())
      .pipe(gulp.dest('./posts')));
  });
});
