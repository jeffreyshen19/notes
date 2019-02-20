var fs = require("fs");
var readline = require('readline');

var input = [];

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.prompt();

rl.on('line', function (cmd) {
  input.push(cmd);
  rl.prompt();
});

rl.on('close', function (cmd) {
  var date = new Date();
  var date_name = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear() + "-" + (date.getHours() % 12 == 0 ? 12 : date.getHours() % 12) + ":" + date.getMinutes() + (date.getHours < 12  ? "AM" : "PM");

  var template = "-var note = '" + input.join("<br>") + "'\ninclude ../layout.pug";

  fs.writeFileSync("./drafts/" + date_name + ".pug", template);

  process.exit(0);
});
