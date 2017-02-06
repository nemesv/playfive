var fs = require('fs');

var copy = {
    'app/main.js': 'dist/main.js',
    'node_modules/p5/lib/p5.min.js': 'dist/p5.min.js',
    'node_modules/p5/lib/addons/p5.dom.js': 'dist/p5.dom.js',
};

if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

module.exports.copy = function () {
    Object.keys(copy).forEach(key => {
        fs.createReadStream(key).pipe(fs.createWriteStream(copy[key]));
        console.log(`copied ${key}`);
    });
}

module.exports.copy();