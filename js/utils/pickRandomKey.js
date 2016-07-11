module.exports = function(object) {
    var keys = [];
    for (var key in object) {
        keys.push(key);
    }

    return keys[Math.floor(Math.random()*keys.length)];
};
