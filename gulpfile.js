var gulp = require('gulp');
var pug = require('gulp-pug');
var fs = require("fs");
var path = require('path');
var data = require('gulp-data');
var es = require('event-stream');
var chrono = require("chrono-node");

gulp.task('default', ['views']);

gulp.task('views', function buildHTML() {
  fs.readdir(__dirname + '/drafts', function(error, notes){
    notes = notes.map(function(d){
      return {
        "path": d.replace(".pug", ""),
        "name": d.replace(".pug", "").replace("-", ".").replace("-", ".").replace("-", " // ").toLowerCase(),
        "date": chrono.parseDate(d.replace(".pug", ""))
      };
    }).sort(function(a,b){
      return b.date - a.date;
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
