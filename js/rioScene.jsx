var React = require("react");
var config = require("./config.js");
var SceneMixin = require("./sceneMixin.jsx");
var TweenLite = require("./libs/gsap/TweenLite.js");


var Cloud = function(cloudSprite) {
    this.sprite = cloudSprite;
    this.animateCloud();
};

Cloud.prototype = {
    animateCloud: function() {
        var speed = config.rio.cloud.speed * (1.0 + config.rio.cloud.speedVariance * (Math.random() - 0.5));
        this.tween = TweenLite.to(this.sprite, (this.sprite.x + this.sprite.width) / speed, {
            x: -this.sprite.width,
            ease: "Linear.easeNone",
            onComplete: function() {
                this.sprite.x = config.sceneWidth;
                this.sprite.y = config.rio.cloud.YMin + Math.random() * (config.rio.cloud.YMax - config.rio.cloud.YMin);
                this.animateCloud();
            }.bind(this)
        });
    },

    dispose: function() {
        this.tween.kill();
    }
};


var Plane = function(planeSprite) {
    this.sprite = planeSprite;
    this.moveRight = false;
    this.animatePlane();
};

Plane.prototype = {
    animatePlane: function() {
        var targetX;

        this.moveRight = !this.moveRight;

        if (this.moveRight) {
            this.sprite.x = -this.sprite.width;
            this.sprite.scale.x = 1.0;
            targetX = config.sceneWidth;
        }
        else {
            this.sprite.x = config.sceneWidth;
            this.sprite.scale.x = -1.0;
            targetX = -this.sprite.width;
        }
        this.sprite.y = config.rio.plane.YMin + Math.random() * (config.rio.plane.YMax - config.rio.plane.YMin);
        this.tween = TweenLite.to(this.sprite, config.sceneWidth / config.rio.plane.speed, {
            x: targetX,
            y: config.rio.plane.YMin + Math.random() * (config.rio.plane.YMax - config.rio.plane.YMin),
            ease: "Linear.easeNone",
            onComplete: this.animatePlane.bind(this)
        });
    },

    dispose: function() {
        this.tween.kill();
    }
};


var RioScene = React.createClass({
    mixins: [SceneMixin],

    initScene: function() {
        this.disposables = [];

        // Animates the clouds
        for (var i=1; i <= 5; i++) {
            this.disposables.push(new Cloud(this.objects["cloud0" + i]));
        }

        // Animates the plane
        this.disposables.push(new Plane(this.objects.plane));
    },

    disposeScene: function() {
        this.disposables.forEach(function(disposable) {
            disposable.dispose();
        });
    }
});

module.exports = RioScene;
