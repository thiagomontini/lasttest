var React = require("react");
var PIXI = require("pixi.js");
var TweenMax = require("../libs/gsap/TweenMax.js");
var TimelineMax = require("../libs/gsap/TimelineMax.js");
var sceneData = require("./sceneData.js");
var SceneMixin = require("./sceneMixin.jsx");
var Cloud = require("../sceneObjects/cloud.js");
var Floater = require("../sceneObjects/floater.js");

var config = sceneData.krabi.config;

var KrabiScene = React.createClass({
    sceneKey: "krabi",

    mixins: [SceneMixin],

    initScene: function() {
        this.disposables = [];

        // Animates the clouds
        for (var i=1; i <= 10; i++) {
            this.disposables.push(new Cloud(this.objects["cloud" + i], config.cloud));
        }

        // Animates the birds
        for (var i=1; i <= 15; i++) {
            this.disposables.push(new Floater(
                this.objects["bird" + i],
                config.birds.amplitude * (0.8 + 0.4*Math.random()),
                config.birds.duration * (0.8 + 0.4*Math.random())
            ));
        }
    },

    disposeScene: function() {
        this.disposables.forEach(function(disposable) {
            disposable.dispose();
        });
    }
});

module.exports = KrabiScene;
