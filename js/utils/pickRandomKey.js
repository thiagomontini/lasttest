var randomPick = require("./randomPick.js");

module.exports = function(object) {
    return randomPick(Object.keys(object));
};
