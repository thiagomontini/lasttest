var randRange = require("./randRange.js");

module.exports = function(a) {
    for (var i=0; i < a.length - 1; i++) {
        var j = Math.floor(randRange(i, a.length));
        var aux = a[i];
        a[i] = a[j];
        a[j] = aux;
    }
}
