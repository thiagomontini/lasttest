module.exports = function(frames, x1, y1, x2, y2) {
    var angle = Math.atan2(-(y2 - y1), x2 - x1);

    return Math.floor((angle + Math.PI) / (2 * Math.PI) * frames);
};
