var React = require("react");
var PIXI = require("pixi.js");
var TweenMax = require("../libs/gsap/TweenMax.js");
var TimelineMax = require("../libs/gsap/TimelineMax.js");
var sceneData = require("./sceneData.js");
var SceneMixin = require("./sceneMixin.jsx");
var TrackObject = require("../sceneObjects/trackObject.js");

var config = sceneData.rome.config;

var RomeScene = React.createClass({
    sceneKey: "rome",

    mixins: [SceneMixin],

    initScene: function() {
        this.disposables = [];

        // Animates the cars
        var animateCar = function(carName, lane, initialPosition) {
            this.objects[carName].anchor.x = 0.5;
            this.objects[carName].anchor.y = 0.5;

            this.disposables.push(new TrackObject(
                this.objects[carName],
                lane.track,
                lane.duration,
                { initialPosition: initialPosition }
            ));
        }.bind(this);
        animateCar("car11", config.road1, 0);
        animateCar("car10", config.road2, 0);
    },

    disposeScene: function() {
        this.disposables.forEach(function(disposable) {
            disposable.dispose();
        });
    }
});

module.exports = RomeScene;
