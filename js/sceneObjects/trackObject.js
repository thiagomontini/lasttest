var computeDistance = require("../utils/computeDistance.js");
var computeAngleFrame = require("../utils/computeAngleFrame.js");

var TrackObject = function(sprite, track, duration, initialPostion, yoyo) {
    // Stores the object itself
    this.sprite = sprite;
    this.previousX = this.sprite.x;
    this.previousY = this.sprite.y;

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
    this.timeline.set(this.sprite, track[0]);
    for (var i=1; i < track.length; i++) {
        var segmentData = {};
        for (var key in track[i]) {
            segmentData[key] = track[i][key];
        }
        segmentData.ease = "Linear.easeNone";
        if (this.sprite.gotoAndStop) {
            segmentData.onProgress = this.setFrame.bind(this);
        }
        this.timeline.to(this.sprite, duration * trackLengths[i] / totalLength, segmentData);
    }
    this.timeline.repeat(-1);
    this.timeline.yoyo(!!yoyo);
    this.timeline.progress(initialPostion || 0);
    this.timeline.play();
}

TrackObject.prototype = {
    setFrame: function() {
        this.sprite.gotoAndStop(computeAngleFrame(
            this.sprite.totalFrames,
            this.previousX,
            this.previousY,
            this.sprite.x,
            this.sprite.y
        ));

        this.previousX = this.sprite.x;
        this.previousY = this.sprite.y;
    },

    dispose: function() {
        this.timeline.kill();
        if (this.sprite.stop) {
            this.sprite.stop();
        }
    }
};

module.exports = TrackObject;
