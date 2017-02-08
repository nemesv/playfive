var fs = require('fs');
var path = require('path');

var copy = {
    'app/main.js': 'main.js',
    'node_modules/p5/lib/p5.min.js': 'p5.min.js',
    'node_modules/p5/lib/addons/p5.dom.js': 'p5.dom.js',
};

module.exports.copy = function (destination) {
    destination = destination || 'dist';
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination);
    }

    Object.keys(copy).forEach(key => {
        fs.createReadStream(key).pipe(fs.createWriteStream(path.join(destination, copy[key])));
        console.log(`copied ${key}`);
    });
}

module.exports.copy();