var React = require("react");
var PIXI = require("pixi.js");
var TweenMax = require("../libs/gsap/TweenMax.js");
var TimelineMax = require("../libs/gsap/TimelineMax.js");
var sceneData = require("./sceneData.js");
var SceneMixin = require("./sceneMixin.jsx");
var TrackObject = require("../sceneObjects/trackObject.js");
var Cloud = require("../sceneObjects/cloud.js");
var randomPick = require("../utils/randomPick.js");
var shuffleArray = require("../utils/shuffleArray.js");

var config = sceneData.rome.config;

var RomeScene = React.createClass({
    sceneKey: "rome",

    mixins: [SceneMixin],

    initScene: function() {
        this.disposables = [];

        // Animates the clouds
        this.disposables.push(new Cloud(this.objects.cloud1, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud2, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud3, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud4, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud5, config.cloud));

        // Animates the cars
        var vehicles = [
            this.objects.car1,
            this.objects.car2,
            this.objects.car3,
            this.objects.car4,
            this.objects.car5,
            this.objects.car6,
            this.objects.car7,
            this.objects.car8,
            this.objects.car9,
            this.objects.car10,
            this.objects.car11
        ];

        vehicles.forEach(function(car) {
            car.parent.removeChild(car);
        });

        var nCars, carStep, carPositions;

        var animateCar = function(car, lane, initialPosition) {
            car = new PIXI.extras.MovieClip(car.textures);
            this.stage.addChildAt(car, 1);
            car.anchor.x = 0.5;
            car.anchor.y = 0.5;

            this.disposables.push(new TrackObject(
                car,
                lane.track,
                lane.duration,
                { initialPosition: initialPosition }
            ));
        }.bind(this);

        for (var roadIndex=2; roadIndex >= 1; roadIndex--) {
            var roadConfig = config["road" + roadIndex];
            carStep = 1.0 / roadConfig.cars;
            carPositions = [];
            for (var i=0; i < roadConfig.cars; i++) {
                carPositions.push(i * carStep + 0.5 * Math.random() * carStep);
            };
            shuffleArray(carPositions);
            for (var i=0; i < roadConfig.cars; i++) {
                animateCar(randomPick(vehicles), roadConfig, carPositions[i]);
            }
        }
    },

    disposeScene: function() {
        this.disposables.forEach(function(disposable) {
            disposable.dispose();
        });
    }
});

module.exports = RomeScene;
