var React = require("react");
var PIXI = require("pixi.js");
var TweenMax = require("../libs/gsap/TweenMax.js");
var TimelineMax = require("../libs/gsap/TimelineMax.js");
var sceneData = require("./sceneData.js");
var SceneMixin = require("./sceneMixin.jsx");
var Cloud = require("../sceneObjects/cloud.js");

var config = sceneData.ny.config;

var KrabiScene = React.createClass({
    sceneKey: "krabi",

    mixins: [SceneMixin],

    initScene: function() {
        this.disposables = [];
    },

    disposeScene: function() {
        this.disposables.forEach(function(disposable) {
            disposable.dispose();
        });
    }
});

module.exports = KrabiScene;
