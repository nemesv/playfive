var exec = require('child_process').exec;
var fs = require('fs');
var build = require('./build.js');
var path = require('path');
var rimraf = require('rimraf');
var fs_extra = require('fs-extra');

var tempDir = fs.mkdtempSync('../deploy');

fs.createReadStream('index.html').pipe(fs.createWriteStream(path.join(tempDir, 'index.html')));
build.copy(path.join(tempDir, "dist"));

exec('git checkout gh-pages', function() {
    //rimraf(destination, function() { });
    fs_extra.copySync(tempDir, '.', {overwrite: true});
    rimraf(tempDir, function() { });
});
