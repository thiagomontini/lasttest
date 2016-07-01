var React = require("react");
var TweenMax = require("../libs/gsap/TweenMax.js");
var TimelineMax = require("../libs/gsap/TimelineMax.js");
var computeDistance = require("../utils/computeDistance.js");
var sceneData = require("./sceneData.js");
var SceneMixin = require("./sceneMixin.jsx");
var Cloud = require("../sceneObjects/cloud.js");

var config = sceneData.ny.config;

var Helicopter = function(helicopterSprite, direction) {
    this.sprite = helicopterSprite;
    this.sprite.anchor.x = this.sprite.anchor.y = 0;
    this.direction = direction;
    this.animateHelicopter();
}

Helicopter.prototype = {
    animateHelicopter: function() {
        var inverted = Math.random() < 0.5 ? 1 : -1;
        var dirX = this.direction[0] * inverted;
        var dirY = this.direction[1];
        this.sprite.scale.x = inverted;

        var initialX, initialY, finalX, finalY, displacement;

        if (Math.abs(dirX) > Math.abs(dirY)) {
            if (inverted > 0) {
                initialX = -this.sprite.width;
                finalX = sceneData.ny.sceneWidth;
            }
            else {
                initialX = sceneData.ny.sceneWidth + this.sprite.width;
                finalX = 0;
            }

            displacement = Math.abs(sceneData.ny.sceneWidth * dirY / dirX);
            initialY = (sceneData.ny.sceneHeight - displacement) * Math.random();
            finalY = initialY + displacement;
        }
        else {
            initialY = -this.sprite.height;
            finalY = sceneData.ny.sceneHeight;

            displacement = Math.abs(sceneData.ny.sceneHeight * dirX / dirY);
            initialX = (sceneData.ny.sceneWidth - displacement) * Math.random();
            finalX = initialX + displacement;
            if (inverted < 0) {
                initialX = sceneData.ny.sceneWidth - initialX;
                finalX = sceneData.ny.sceneWidth - finalX;
            }
        }

        this.sprite.x = initialX;
        this.sprite.y = initialY;

        var heliTime = (config.helicopterTime - config.helicopterTimeVariance) + config.helicopterTimeVariance * Math.random();

        this.tween = TweenMax.to(this.sprite, heliTime, {
            x: finalX,
            y: finalY,
            ease: "Linear.easeNone",
            onComplete: this.animateHelicopter.bind(this)
        });
    },

    dispose: function() {
        this.tween.kill();
    }
}


var Ship = function(shipMovieClip, direction, anchor, speed) {
    this.movieClip = shipMovieClip;
    this.mainAxis = direction;
    this.secondaryAxis = [direction[0], -direction[1]];
    this.p = 0;
    this.q = 0;
    this.anchor = [anchor[0] / this.movieClip.width, anchor[1] / this.movieClip.height];
    this.movieClip.anchor.x = this.anchor[0];
    this.movieClip.anchor.y = this.anchor[1];
    this.speed = speed;
    this.originalX = this.movieClip.x;
    this.originalY = this.movieClip.y;
    this.animateShip();
}

Ship.prototype = {
    animateShip: function() {
        // Generates the new target coordinates
        var targetX, targetY;

        if (Math.random() < 0.5) {
            this.p = Math.random();
        }
        else {
            this.q = Math.random();
        }

        targetX = this.originalX + this.mainAxis[0] * this.p + this.secondaryAxis[0] * this.q;
        targetY = this.originalY + this.mainAxis[1] * this.p + this.secondaryAxis[1] * this.q;

        // Turns the ship in the right direction
        if (targetX >= this.movieClip.x) {
            this.movieClip.scale.x = 1;
        }
        else {
            this.movieClip.scale.x = -1;
        }

        if (targetY >= this.movieClip.y) {
            this.movieClip.gotoAndStop(0);
            this.movieClip.anchor.y = this.anchor[1];
        }
        else {
            this.movieClip.gotoAndStop(1);
            this.movieClip.anchor.y = 1 - this.anchor[1];
        }

        // Tweens the ship
        var distance = computeDistance(this.movieClip.x, this.movieClip.y, targetX, targetY);
        var tweenTime = distance / this.speed;

        this.tween = TweenMax.to(this.movieClip, tweenTime, {
            x: targetX,
            y: targetY,
            ease: "Linear.easeNone",
            onComplete: this.animateShip.bind(this)
        });
    },

    dispose: function() {
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
        this.disposables.push(new Ship(this.objects.ship1, config.ship1.direction, config.ship1.anchor, config.ship1.speed));
        this.disposables.push(new Ship(this.objects.ship3, config.ship3.direction, config.ship3.anchor, config.ship3.speed));
        this.disposables.push(new Ship(this.objects.ship4, config.ship4.direction, config.ship4.anchor, config.ship4.speed));
        this.disposables.push(new Ship(this.objects.ship10, config.ship10.direction, config.ship10.anchor, config.ship10.speed));
        this.disposables.push(new Ship(this.objects.ship15, config.ship15.direction, config.ship15.anchor, config.ship15.speed));
    },

    disposeScene: function() {
        this.disposables.forEach(function(disposable) {
            disposable.dispose();
        });
    }
});

module.exports = NYScene;
