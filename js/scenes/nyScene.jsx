var React = require("react");
var PIXI = require("pixi.js");
var TweenMax = require("../libs/gsap/TweenMax.js");
var TimelineMax = require("../libs/gsap/TimelineMax.js");
var sceneData = require("./sceneData.js");
var SceneMixin = require("./sceneMixin.jsx");
var Cloud = require("../sceneObjects/cloud.js");
var randRange = require("../utils/randRange.js");
var TrackObject = require("../sceneObjects/trackObject.js");
var computeAngleFrame = require("../utils/computeAngleFrame.js");
var computeDistance = require("../utils/computeDistance.js");
var randomPick = require("../utils/randomPick.js");

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


var Boat = function(movieClip, track, duration, waterTrail) {
    // Stores the object itself
    this.movieClip = movieClip;
    this.movieClip.anchor.x = this.movieClip.anchor.y = 0.5;
    this.previousX = this.movieClip.x;
    this.previousY = this.movieClip.y;

    // Clones the water trail object
    this.waterTrail = new PIXI.Sprite(waterTrail.texture);
    this.waterTrail.anchor.x = 0.1;
    this.waterTrail.anchor.y = 0.5;
    this.waterTrail.scale.x = 0.6;
    this.waterTrail.scale.y = 0.6;

    // Assembles the container
    this.container = new PIXI.Sprite();
    this.container.x = this.movieClip.x;
    this.container.y = this.movieClip.y;
    this.movieClip.x = 0;
    this.movieClip.y = 0;
    this.movieClip.parent.addChildAt(
        this.container,
        this.movieClip.parent.getChildIndex(this.movieClip)
    );
    this.container.addChild(this.waterTrail);
    this.container.addChild(this.movieClip);

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
    this.timeline.set(this.container, {
        x: track[0].x,
        y: track[0].y
    });
    for (var i=1; i < track.length; i++) {
        this.timeline.to(this.container, duration * trackLengths[i] / totalLength, {
            x: track[i].x,
            y: track[i].y,
            ease: "Linear.easeNone",
            onUpdate: this.setFrame.bind(this)
        });
    }
    this.timeline.repeat(-1);
    this.timeline.play();
}

Boat.prototype = {
    setFrame: function() {
        var angleFrame = computeAngleFrame(
            this.movieClip.totalFrames,
            this.previousX,
            this.previousY,
            this.container.x,
            this.container.y
        );
        this.movieClip.gotoAndStop(angleFrame);
        this.previousX = this.container.x;
        this.previousY = this.container.y;

        this.waterTrail.rotation = -2 * Math.PI * angleFrame / this.movieClip.totalFrames;
    },

    dispose: function() {
        this.timeline.kill();
    }
};



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
        this.objects.waterTrail.parent.removeChild(this.objects.waterTrail);
        var animateBoat = function(boatName) {
            this.disposables.push(new Boat(
                this.objects[boatName],
                config[boatName].track,
                config[boatName].duration,
                this.objects.waterTrail
            ));
        }.bind(this);
        animateBoat("boat1");
        animateBoat("boat2");
        animateBoat("boat3");
        animateBoat("boat4");
        animateBoat("boat5");
        animateBoat("boat6");
        animateBoat("boat7");

        // Animates the cars
        var carLanes = [config.carLane01, config.carLane02];
        var animateCar = function(carName, lane) {
            this.objects[carName].anchor.x = 0.5;
            this.objects[carName].anchor.y = 0.5;

            this.disposables.push(new TrackObject(
                this.objects[carName],
                lane.track,
                lane.duration,
                { initialPosition: Math.random() }
            ));
        }.bind(this);
        // animateCar("car1", config.carLane);
        // animateCar("car2", config.carLane);
        // animateCar("car3", config.carLane);
        // animateCar("car4", config.carLane);
        // animateCar("car5", config.carLane);
        // animateCar("car6", config.carLane);
        // animateCar("car7", config.carLane);
        // animateCar("car8", config.carLane);
        animateCar("car9", config.carLane);
        // animateCar("car10", config.carLane);
    },

    disposeScene: function() {
        this.disposables.forEach(function(disposable) {
            disposable.dispose();
        });
    }
});

module.exports = NYScene;
