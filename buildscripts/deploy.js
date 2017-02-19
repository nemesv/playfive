var exec = require('child_process').exec;
var fs = require('fs');
//var build = require('./build.js');
var path = require('path');
var rimraf = require('rimraf');
var fs_extra = require('fs-extra');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config');

var tempDir = fs.mkdtempSync('../deploy');

webpackConfig.output.path = path.join(tempDir, "dist");

fs.createReadStream('index.html').pipe(fs.createWriteStream(path.join(tempDir, 'index.html')));

webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.log(err);
        return;
    }
    exec('git checkout gh-pages', function () {
        fs_extra.copySync(tempDir, '.', { overwrite: true });
        rimraf(tempDir, function () { });
    });
});