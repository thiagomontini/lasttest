var TrackObject = function(sprite, track, initialPostion, yoyo) {
    var lengths = config.cableCar.lengths;

    this.sprite = sprite;



    this.timeline = new TimelineMax();
    this.timeline.set(this.sprite, track[0]);
    for (var i=1; i < track.length; i++) {
        var segmentData = {};
        for (var key in track[i]) {
            segmentData[key] = track[i][key];
        }
        segmentData.ease = "Linear.easeNone";
        this.timeline.to(this.sprite, lengths[i] * config.cableCar.tripDuration, segmentData);
    }
    this.timeline.repeat(-1);
    this.timeline.yoyo(!!yoyo);
    this.timeline.progress(initialPostion || 0);
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
