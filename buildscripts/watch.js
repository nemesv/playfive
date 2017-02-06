// var fs = require('fs');

var bs = require("browser-sync").create();
var build = require('./build.js');

bs.watch("./app/*.*").on("change",
    function () {
        build.copy();
        bs.reload();
    });

bs.watch("index.html").on("change", bs.reload);

bs.init({
    server: "."
});