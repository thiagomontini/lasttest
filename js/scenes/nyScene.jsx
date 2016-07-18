var React = require("react");
var PIXI = require("pixi.js");
var TweenMax = require("../libs/gsap/TweenMax.js");
var TimelineMax = require("../libs/gsap/TimelineMax.js");
var sceneData = require("./sceneData.js");
var SceneMixin = require("./sceneMixin.jsx");
var Cloud = require("../sceneObjects/cloud.js");
var randRange = require("../utils/randRange.js");
var shuffleArray = require("../utils/shuffleArray.js");
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
        var animateBoat = function(boatName) {
            this.objects[boatName].anchor.x = 0.5;
            this.objects[boatName].anchor.y = 0.5;
            var track = config[boatName].track;
            for (var i=0; i < track.length - 1; i++) {
                track[i].frame = computeAngleFrame(
                    this.objects[boatName].totalFrames,
                    track[i].x,
                    track[i].y,
                    track[i+1].x,
                    track[i+1].y
                );
            }
            this.disposables.push(new TrackObject(
                this.objects[boatName],
                config[boatName].track,
                config[boatName].duration
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
        var nCars = 11;
        var carStep = 1.0 / nCars;
        var carPositions = [];
        for (var i=0; i < nCars; i++) {
            carPositions.push(i * carStep + 0.5 * Math.random() * carStep);
        }
        shuffleArray(carPositions);

        var animateCar = function(carName, lane, initialPosition) {
            this.objects[carName].anchor.x = 0.5;
            this.objects[carName].anchor.y = 0.5;

            this.disposables.push(new TrackObject(
                this.objects[carName],
                lane.track,
                lane.duration,
                { initialPosition: initialPosition }
            ));
        }.bind(this);
        animateCar("car1", config.carLane, carPositions[0]);
        animateCar("car2", config.carLane, carPositions[1]);
        animateCar("car3", config.carLane, carPositions[2]);
        // animateCar("car4", config.carLane, carPositions[3]);
        animateCar("car5", config.carLane, carPositions[4]);
        animateCar("car6", config.carLane, carPositions[5]);
        animateCar("car7", config.carLane, carPositions[6]);
        animateCar("car8", config.carLane, carPositions[7]);
        animateCar("car9", config.carLane, carPositions[8]);
        animateCar("car10", config.carLane, carPositions[9]);
        animateCar("car11", config.carLane, carPositions[10]);
    },

    disposeScene: function() {
        this.disposables.forEach(function(disposable) {
            disposable.dispose();
        });
    }
});

module.exports = NYScene;
