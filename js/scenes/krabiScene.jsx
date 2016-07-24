var React = require("react");
var PIXI = require("pixi.js");
var TweenMax = require("../libs/gsap/TweenMax.js");
var TimelineMax = require("../libs/gsap/TimelineMax.js");
var sceneData = require("./sceneData.js");
var SceneMixin = require("./sceneMixin.jsx");
var Cloud = require("../sceneObjects/cloud.js");
var TrackObject = require("../sceneObjects/trackObject.js");
var Floater = require("../sceneObjects/floater.js");
var computeAngleFrame = require("../utils/computeAngleFrame.js");

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
            this.objects["bird" + i].play();
            if (Math.random() < 0.5) {
                this.objects["bird" + i].scale.x = -1;
            }
            this.disposables.push(new Floater(
                this.objects["bird" + i],
                config.birds.amplitude * (0.8 + 0.4*Math.random()),
                config.birds.duration * (0.8 + 0.4*Math.random())
            ));
        }

        // Animates the moving boats
        this.stage.removeChild(this.objects.movingBoat1);
        this.stage.removeChild(this.objects.movingBoat2);
        this.stage.removeChild(this.objects.movingBoat3);
        this.stage.removeChild(this.objects.movingBoat4);

        var animateBoat = function(trackData) {
            var boat = new PIXI.extras.MovieClip(this.objects[trackData.object].textures);
            boat.anchor.x = boat.anchor.y = 0.5;
            this.stage.addChildAt(boat, 1);
            for (var i=0; i < trackData.track.length - 1; i++) {
                trackData.track[i].frame = computeAngleFrame(
                    boat.totalFrames,
                    trackData.track[i].x,
                    trackData.track[i].y,
                    trackData.track[i+1].x,
                    trackData.track[i+1].y
                );
            }
            this.disposables.push(new TrackObject(
                boat,
                trackData.track,
                trackData.duration
            ));
        }.bind(this);
        animateBoat(config.boatTrack1);
        animateBoat(config.boatTrack2);
        animateBoat(config.boatTrack3);
        animateBoat(config.boatTrack4);
        animateBoat(config.boatTrack5);

        // Animates the static boats
        var boatIds = [
            /*"boat1",*/ /*"boat2",*/ "boat3", "boat4", "boat6", "boat7", "boat8",
            "boat9", /*"boat10",*/ "boat11", /*"boat15",*/ "boat16", "boat17", "boat18",
            /*"boat20",*/ "boat21", "boat23", "boat24", /*"boat26",*/ "boat27", "boat28", "boat30"
        ];
        boatIds.forEach(function(boatId) {
            this.stage.addChildAt(this.objects[boatId], 1);
            this.disposables.push(new Floater(
                this.objects[boatId],
                config.boats.amplitude * (0.8 + 0.4*Math.random()),
                config.boats.duration * (0.8 + 0.4*Math.random())
            ));
        }.bind(this));
    },

    disposeScene: function() {
        this.disposables.forEach(function(disposable) {
            disposable.dispose();
        });
        for (var i=1; i <= 15; i++) {
            this.objects["bird" + i].stop();
        }
    }
});

module.exports = KrabiScene;
