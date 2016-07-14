var React = require("react");
var TweenMax = require("../libs/gsap/TweenMax.js");
var TimelineMax = require("../libs/gsap/TimelineMax.js");
var sceneData = require("./sceneData.js");
var SceneMixin = require("./sceneMixin.jsx");
var Cloud = require("../sceneObjects/cloud.js");
var randRange = require("../utils/randRange.js");
var TrackObject = require("../sceneObjects/trackObject.js");
var computeDistance = require("../utils/computeDistance.js");

var config = sceneData.ny.config;

var Helicopter = function(helicopterMovieClip, direction) {
    this.movieClip = helicopterMovieClip;
    this.movieClip.anchor.x = this.movieClip.anchor.y = 0;
    this.movieClip.animationSpeed = 0.25;
    this.movieClip.play();
    this.direction = direction;
    this.animateHelicopter();
}

Helicopter.prototype = {
    animateHelicopter: function() {
        var inverted = Math.random() < 0.5 ? 1 : -1;
        var dirX = this.direction[0] * inverted;
        var dirY = this.direction[1];
        this.movieClip.scale.x = inverted;

        var initialX, initialY, finalX, finalY, displacement;

        displacement = sceneData.ny.sceneHeight * this.direction[0] / this.direction[1];

        initialX = randRange(-displacement / 2, sceneData.ny.sceneWidth - displacement / 2);
        initialY = -this.movieClip.height;
        finalX = initialX + displacement;
        finalY = sceneData.ny.sceneHeight;

        if (inverted == -1) {
            initialX = sceneData.ny.sceneWidth - initialX;
            finalX = sceneData.ny.sceneWidth - finalX;
        }

        this.movieClip.x = initialX;
        this.movieClip.y = initialY;

        var speed = randRange(config.helicopterSpeed[0], config.helicopterSpeed[1]);
        var time = computeDistance(initialX, initialY, finalX, finalY) / speed;

        this.tween = TweenMax.to(this.movieClip, time, {
            x: finalX,
            y: finalY,
            ease: "Linear.easeNone",
            onComplete: this.animateHelicopter.bind(this)
        });
    },

    dispose: function() {
        this.movieClip.stop();
        this.tween.kill();
    }
}


var NYScene = React.createClass({
    sceneKey: "ny",

    mixins: [SceneMixin],

    initScene: function() {
        this.disposables = [];

        // Animates the clouds
        this.disposables.push(new Cloud(this.objects.cloud1, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud2, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud3, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud4, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud5, config.cloud));

        // Animates the helicopters
        this.disposables.push(new Helicopter(this.objects.helicopter1, config.helicopter1.direction));
        this.disposables.push(new Helicopter(this.objects.helicopter2, config.helicopter2.direction));
        this.disposables.push(new Helicopter(this.objects.helicopter3, config.helicopter3.direction));

        // Animates the ships
        this.disposables.push(new TrackObject(
            this.objects.boat1,
            config.boat1.track,
            config.boat1.duration
        ));
    },

    disposeScene: function() {
        this.disposables.forEach(function(disposable) {
            disposable.dispose();
        });
    }
});

module.exports = NYScene;
