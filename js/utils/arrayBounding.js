function arrayBounding(array) {
    var minx = null;
    var miny = null;
    var minz = null;
    var maxx = null;
    var maxy = null;
    var maxz = null;

    array.forEach(function(object) {
        object.geometry.computeBoundingBox();

        var minVec = object.geometry.boundingBox.min;
        var maxVec = object.geometry.boundingBox.max;

        minx = minx == null || minVec.x < minx ? minVec.x : minx;
        miny = miny == null || minVec.y < miny ? minVec.y : miny;
        minz = minz == null || minVec.z < minz ? minVec.z : minz;

        maxx = maxx == null || maxVec.x > maxx ? maxVec.x : maxx;
        maxy = maxy == null || maxVec.y > maxy ? maxVec.y : maxy;
        maxz = maxz == null || maxVec.z > maxz ? maxVec.z : maxz;
    });

    return {
        min: [minx, miny, minz],
        max: [maxx, maxy, maxz]
    }
}

module.exports = arrayBounding;
