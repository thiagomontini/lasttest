var React = require("react");
var PIXI = require("pixi.js");
var TweenMax = require("../libs/gsap/TweenMax.js");
var TimelineMax = require("../libs/gsap/TimelineMax.js");
var sceneData = require("./sceneData.js");
var SceneMixin = require("./sceneMixin.jsx");

var config = sceneData.ny.config;

var RomeScene = React.createClass({
    sceneKey: "rome",

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

module.exports = RomeScene;
