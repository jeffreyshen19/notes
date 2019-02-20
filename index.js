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
});

rl.on('close', function (cmd) {
  process.exit(0);

  var date = new Date();
  var date_name = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear() + "-" + (date.getHours() % 12 == 0 ? 12 : date.getHours() % 12) + ":" + date.getMinutes() + (date.getHours < 12  ? "AM" : "PM");

  var template = "extends ../layout.pug\nblock note\n\tp ";

  console.log(template + input.join("\n"));

  fs.writeFileSync("./drafts/" + date_name + ".pug", template + input.join("\n"));
});
