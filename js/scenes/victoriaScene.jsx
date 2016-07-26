var React = require("react");
var PIXI = require("pixi.js");
var TweenMax = require("../libs/gsap/TweenMax.js");
var sceneData = require("./sceneData.js");
var SceneMixin = require("./sceneMixin.jsx");
var Cloud = require("../sceneObjects/cloud.js");
var Floater = require("../sceneObjects/floater.js");

var config = sceneData.victoria.config;

var Glider = function(sprite, amplitude, duration) {
    this.sprite = sprite;

    this.floatTween = TweenMax.to(this.sprite, duration, {
        y: this.sprite.y + amplitude,
        ease: "Quad.easeInOut"
    });
    this.floatTween.repeat(-1);
    this.floatTween.yoyo(true);
    this.floatTween.progress(Math.random());

    this.tiltTween = TweenMax.to(this.sprite, 8,
        {
            rotation: 40 * Math.PI / 180,
            ease: "Quad.easeInOut"
        }
    );
    this.tiltTween.repeat(-1);
    this.tiltTween.yoyo(true);
};

Glider.prototype = {
    dispose: function() {
        this.floatTween.kill();
        this.tilsTween.kill();
    }
};

var VictoriaScene = React.createClass({
    sceneKey: "victoria",

    mixins: [SceneMixin],

    initScene: function() {
        this.disposables = [];

        // Animates the clouds
        [
            "cloud2",
            "cloud3",
            "cloud4",
            "cloud5",
            "cloud7",
            "cloud8",
            "cloud9",
            "cloud10"
        ].forEach(function(cloudName) {
            this.disposables.push(new Cloud(this.objects[cloudName], config.cloud));
        }.bind(this));

        [
            "cloud1",
            "cloud6"
        ].forEach(function(cloudName) {
            this.disposables.push(new Cloud(this.objects[cloudName], {
                "yMin": 0,
                "yMax": 0,
                "speed": config.cloud.speed,
                "sceneWidth": config.cloud.sceneWidth,
                "speedVariance": config.cloud.speedVariance
            }));
        }.bind(this));

        // Animates the birds
        [
            "bird1",
            "bird2",
            "bird3",
            "bird4",
            "bird5",
            "bird6",
            "bird7",
            "bird8",
            "bird9",
            "bird10",
            "bird11",
            "bird12",
            "bird13",
            "bird14",
            "bird15",
            "bird16"
        ].forEach(function(birdName) {
            this.disposables.push(new Floater(this.objects[birdName], 50, 3));
        }.bind(this));

        // Animates the glider
        this.objects.glider.anchor.x = this.objects.glider.anchor.y = 0.5;
        this.disposables.push(new Glider(this.objects.glider, 100, 4));
    },

    disposeScene: function() {
        this.disposables.forEach(function(disposable) {
            disposable.dispose();
        });
    }
});

module.exports = VictoriaScene;
