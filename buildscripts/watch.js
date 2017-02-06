var fs = require('fs');
var build = require('./build.js');

var timeout;

fs.watch('./app', (eventType, filename) => {
    if (!timeout) {
        build.copy();
        timeout = setTimeout(function () {
            timeout = null
        }, 1000);
    }
});