var TweenMax = require("../libs/gsap/TweenMax.js");

var Floater = function(sprite, amplitude, duration) {
    this.sprite = sprite;

    this.sprite.y -= amplitude / 2;

    this.tween = TweenMax.to(this.sprite, duration, {
        y: this.sprite.y + amplitude,
        ease: "Quad.easeInOut"
    });
    this.tween.repeat(-1);
    this.tween.yoyo(true);
    this.tween.progress(Math.random());
}

Floater.prototype = {
    dispose: function() {
        this.tween.kill();
    }
};

module.exports = Floater;
