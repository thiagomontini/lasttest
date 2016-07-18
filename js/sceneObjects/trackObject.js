var computeDistance = require("../utils/computeDistance.js");
var computeAngleFrame = require("../utils/computeAngleFrame.js");

var TrackObject = function(sprite, track, duration, params) {
    this.params = params || {};
    this.params.yoyo = !!params.yoyo;
    this.params.initialPosition = params.initialPosition || 0;

    // Stores the object itself
    this.sprite = sprite;

    // Computes the total length
    var trackLengths = track.map(function(x, index, array) {
        if (index == 0) {
            return 0;
        }

        return computeDistance(array[index].x, array[index].y, array[index-1].x, array[index-1].y);
    });

    var totalLength = trackLengths.reduce(function(a, b) {
        return a + b;
    });

    // Builds the timeline
    this.timeline = new TimelineMax();
    this.timeline.set(this.sprite, {x: track[0].x, y: track[0].y});
    if (track[0].frame != undefined) {
        this.timeline.addCallback(this.sprite.gotoAndStop.bind(this.sprite, track[0].frame));
    }
    for (var i=1; i < track.length; i++) {
        this.timeline.to(this.sprite, duration * trackLengths[i] / totalLength, {
            x: track[i].x,
            y: track[i].y,
            ease: "Linear.easeNone"
        });
        if (track[i].frame != undefined) {
            this.timeline.addCallback(this.sprite.gotoAndStop.bind(this.sprite, track[i].frame));
        }
    }
    this.timeline.repeat(-1);
    this.timeline.yoyo(this.params.yoyo);
    this.timeline.progress(this.params.initialPosition);
    this.timeline.play();
}

TrackObject.prototype = {
    dispose: function() {
        this.timeline.kill();
        if (this.sprite.stop) {
            this.sprite.stop();
        }
    }
};

module.exports = TrackObject;