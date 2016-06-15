// This is a small hack that allows us to use createjs inside the Webpack/CommonJS environment without
// patching the original code
window.createjs = {};

require('./preloadjs-0.6.2.min.js');

module.exports = window.createjs;
