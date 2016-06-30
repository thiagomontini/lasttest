var React = require("react");
var TweenMax = require("../libs/gsap/TweenMax.js");
var TimelineMax = require("../libs/gsap/TimelineMax.js");
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

    },

    disposeScene: function() {
        this.disposables.forEach(function(disposable) {
            disposable.dispose();
        });
    }
});

module.exports = NYScene;
