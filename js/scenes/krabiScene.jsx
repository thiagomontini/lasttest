var React = require("react");
var PIXI = require("pixi.js");
var TweenMax = require("../libs/gsap/TweenMax.js");
var TimelineMax = require("../libs/gsap/TimelineMax.js");
var sceneData = require("./sceneData.js");
var SceneMixin = require("./sceneMixin.jsx");
var Cloud = require("../sceneObjects/cloud.js");

var config = sceneData.krabi.config;

var KrabiScene = React.createClass({
    sceneKey: "krabi",

    mixins: [SceneMixin],

    initScene: function() {
        this.disposables = [];

        // Animates the clouds
        this.disposables.push(new Cloud(this.objects.cloud1, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud2, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud3, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud4, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud5, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud6, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud7, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud8, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud9, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud10, config.cloud));
    },

    disposeScene: function() {
        this.disposables.forEach(function(disposable) {
            disposable.dispose();
        });
    }
});

module.exports = KrabiScene;
