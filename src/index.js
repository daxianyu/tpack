/*globals __dirname, module, require */
const path = require('path');
let here = __dirname,
    root = path.resolve(here, '../'),
    dist = path.resolve(root, 'dist');

module.exports = {
    base: {
        pages: path.resolve(here, '../src/pages/**/*.js')
    },
    build: {
        assetsPublicPath: dist,
        assetsSubDirectory: __dirname,
    },
    dev: {
        port: 8008
    },
    externals: {
        React: ''
    }
};