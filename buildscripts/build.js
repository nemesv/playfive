var fs = require('fs');

var copy = {
    'app/main.js': 'dist/main.js',
    'node_modules/p5/lib/p5.min.js' : 'dist/p5.min.js',
    'node_modules/p5/lib/addons/p5.dom.js' : 'dist/p5.dom.js',
};

Object.keys(copy).forEach(key => {
    fs.createReadStream(key).pipe(fs.createWriteStream(copy[key]));
});

