var React = require("react");
var TweenMax = require("../libs/gsap/TweenMax.js");
var TimelineMax = require("../libs/gsap/TimelineMax.js");
var sceneData = require("./sceneData.js");
var SceneMixin = require("./sceneMixin.jsx");
var Cloud = require("../sceneObjects/cloud.js");
var randRange = require("../utils/randRange.js");
var computeDistance = require("../utils/computeDistance.js");
var computeAngleFrame = require("../utils/computeAngleFrame.js");

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


var Boat = function(boatMovieClip, parameters) {
    this.movieClip = boatMovieClip;
    this.centerX = this.movieClip.x;
    this.centerY = this.movieClip.y;
    this.previousX = this.movieClip.x;
    this.previousY = this.movieClip.y;
    this.f1 = Math.random()*3 + 2;
    this.f2 = Math.random()*3 + 2;
    this.width = parameters.width;
    this.height = parameters.height;
    this.rotation = parameters.rotation;
    this.speed = parameters.speed;
    this.positionShip(0);
    this.animationLoop = this.animationLoop.bind(this);
    this.animationId = window.requestAnimationFrame(this.animationLoop);
}

Boat.prototype = {
    animationLoop: function() {
        this.positionShip(this.t + this.speed);
        this.animationId = window.requestAnimationFrame(this.animationLoop);
    },

    positionShip: function(t) {
        this.t = t;
        this.previousX = this.movieClip.x;
        this.previousY = this.movieClip.y;
        this.movieClip.x = this.centerX + this.width*Math.sin(this.f1*this.t);
        this.movieClip.y = this.centerY + this.height*Math.sin(this.f2*this.t);
        this.movieClip.gotoAndStop(computeAngleFrame(
            this.movieClip.totalFrames,
            this.previousX,
            this.previousY,
            this.movieClip.x,
            this.movieClip.y
        ));
    },

    dispose: function() {
        window.clearAnimationFrame(this.animationId);
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

        // // Animates the ships
        this.disposables.push(new Boat(this.objects.boat1, config.boat1));
        // this.disposables.push(new Ship(this.objects.ship1, config.ship1.direction, config.ship1.anchor, config.ship1.speed));
        // this.disposables.push(new Ship(this.objects.ship3, config.ship3.direction, config.ship3.anchor, config.ship3.speed));
        // this.disposables.push(new Ship(this.objects.ship4, config.ship4.direction, config.ship4.anchor, config.ship4.speed));
        // this.disposables.push(new Ship(this.objects.ship10, config.ship10.direction, config.ship10.anchor, config.ship10.speed));
        // this.disposables.push(new Ship(this.objects.ship15, config.ship15.direction, config.ship15.anchor, config.ship15.speed));
        // this.disposables.push(new Ship(this.objects.ship18, config.ship18.direction, config.ship18.anchor, config.ship18.speed));
        // this.disposables.push(new Ship(this.objects.ship21, config.ship21.direction, config.ship21.anchor, config.ship21.speed));
        // this.disposables.push(new Ship(this.objects.ship23, config.ship23.direction, config.ship23.anchor, config.ship23.speed));
    },

    disposeScene: function() {
        this.disposables.forEach(function(disposable) {
            disposable.dispose();
        });
    }
});

module.exports = NYScene;
