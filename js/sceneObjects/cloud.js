var TweenMax = require("../libs/gsap/TweenMax.js");

var Cloud = function(cloudSprite, config) {
    this.sprite = cloudSprite;
    this.config = config;
    this.animateCloud();
};

Cloud.prototype = {
    animateCloud: function() {
        var speed = this.config.speed * (1.0 + this.config.speedVariance * (Math.random() - 0.5));
        this.tween = TweenMax.to(this.sprite, (this.sprite.x + this.sprite.width) / speed, {
            x: -this.sprite.width,
            ease: "Linear.easeNone",
            onComplete: function() {
                this.sprite.x = this.config.sceneWidth;
                this.sprite.y = this.config.yMin + Math.random() * (this.config.yMax - this.config.yMin);
                this.animateCloud();
            }.bind(this)
        });
    },

    dispose: function() {
        this.tween.kill();
    }
};

module.exports = Cloud;
