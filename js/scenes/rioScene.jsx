var React = require("react");
var sceneData = require("./sceneData.js");
var SceneMixin = require("./sceneMixin.jsx");
var TweenMax = require("../libs/gsap/TweenMax.js");
var TimelineMax = require("../libs/gsap/TimelineMax.js");
var Cloud = require("../sceneObjects/cloud.js");
var Floater = require("../sceneObjects/floater.js");

var config = sceneData.rio.config;

var Plane = function(planeMovieClip) {
    this.movieClip = planeMovieClip;
    this.movieClip.play();
    this.moveRight = false;
    this.animatePlane();
};

Plane.prototype = {
    animatePlane: function() {
        var targetX;

        this.moveRight = !this.moveRight;

        if (this.moveRight) {
            this.movieClip.x = -this.movieClip.width;
            this.movieClip.scale.x = 1.0;
            targetX = sceneData.rio.sceneWidth;
        }
        else {
            this.movieClip.x = sceneData.rio.sceneWidth;
            this.movieClip.scale.x = -1.0;
            targetX = -this.movieClip.width;
        }
        this.movieClip.y = config.plane.YMin + Math.random() * (config.plane.YMax - config.plane.YMin);
        this.tween = TweenMax.to(this.movieClip, sceneData.rio.sceneWidth / config.plane.speed, {
            x: targetX,
            y: config.plane.YMin + Math.random() * (config.plane.YMax - config.plane.YMin),
            ease: "Linear.easeNone",
            onComplete: this.animatePlane.bind(this)
        });
    },

    dispose: function() {
        this.tween.kill();
    }
};


var Glider = function(gliderSprite) {
    this.sprite = gliderSprite;
    this.sprite.anchor.x = 1.0;
    this.sprite.anchor.y = 0.0;
    this.animateGlider();
};

Glider.prototype = {
    animateGlider: function() {
        this.sprite.x = 0;
        this.meanY = config.glider.YMin + Math.random() * (config.glider.YMax - config.glider.YMin);
        this.sprite.y = this.meanY;
        this.tween = TweenMax.to(this.sprite, sceneData.rio.sceneWidth / config.glider.speed, {
            x: sceneData.rio.sceneWidth + this.sprite.width,
            ease: "Linear.easeNone",
            onUpdate: function() {
                this.sprite.y = this.meanY + config.glider.amplitude * Math.sin(config.glider.frequency * this.sprite.x);
                this.sprite.rotation = Math.atan(config.glider.amplitude * config.glider.frequency * Math.cos(config.glider.frequency * this.sprite.x));
            }.bind(this),
            onComplete: this.animateGlider.bind(this)
        });
    },

    dispose: function() {
        this.tween.kill();
    }
};


var CableCar = function(cableCarSprite, initialPostion) {
    var track = config.cableCar.track;
    var lengths = config.cableCar.lengths;

    this.sprite = cableCarSprite;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.0;

    this.timeline = new TimelineMax();
    this.timeline.set(this.sprite, {x: track[0].x, y: track[0].y});
    for (var i=0; i < track.length - 1; i++) {
        this.timeline.to(this.sprite, lengths[i] * config.cableCar.tripDuration, {
            x: track[i+1].x,
            y: track[i+1].y,
            ease: "Linear.easeNone"
        });
    }
    this.timeline.repeat(-1);
    this.timeline.yoyo(true);
    this.timeline.progress(initialPostion);
    this.timeline.play();
}

CableCar.prototype = {
    dispose: function() {
        this.timeline.kill();
    }
};


var Person = function(personSprite, motionRadius) {
    this.sprite = personSprite;
    this.centerX = this.sprite.x;
    this.centerY = this.sprite.y;
    this.radius = motionRadius || 40;
    this.animationLoop();
}

Person.prototype = {
    animationLoop: function() {
        var angle = 2*Math.PI*Math.random();
        var distance = this.radius*Math.random();

        this.tween = TweenMax.to(this.sprite, 1.5 + Math.random(), {
            x: this.centerX + distance*Math.cos(angle),
            y: this.centerY + distance*Math.sin(angle) / 2,
            ease: "Linear.easeNone",
            delay: 0.4 + 0.4 * Math.random(),
            onComplete: this.animationLoop.bind(this)
        });
    },

    dispose: function() {
        this.tween.kill();
    }
}


var RioScene = React.createClass({
    sceneKey: "rio",

    mixins: [SceneMixin],

    initScene: function() {
        this.disposables = [];

        // Animates the clouds
        this.disposables.push(new Cloud(this.objects.cloud1, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud2, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud3, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud4, config.cloud));
        this.disposables.push(new Cloud(this.objects.cloud5, config.cloud));

        // Animates the plane
        this.disposables.push(new Plane(this.objects.plane));

        // Animates the glider
        this.disposables.push(new Glider(this.objects.glider));

        // Animates the cable car
        this.disposables.push(new CableCar(this.objects.cableCar1, 0.5 * Math.random()));
        this.disposables.push(new CableCar(this.objects.cableCar2, 0.5 * Math.random() + 0.5));

        // Animates the people in the Redeemer statue
        this.disposables.push(new Person(this.objects.redeemer_people3));
        this.disposables.push(new Person(this.objects.redeemer_people5));
        this.disposables.push(new Person(this.objects.redeemer_people7));
        this.disposables.push(new Person(this.objects.redeemer_people8));
        this.disposables.push(new Person(this.objects.redeemer_people9));
        this.disposables.push(new Person(this.objects.redeemer_people10));

        // Animates the seagulls
        this.disposables.push(new Floater(
            this.objects.seagull1,
            config.seagull.amplitude * (0.8 + 0.4*Math.random()),
            config.seagull.duration * (0.8 + 0.4*Math.random())
        ));
        this.disposables.push(new Floater(
            this.objects.seagull2,
            config.seagull.amplitude * (0.8 + 0.4*Math.random()),
            config.seagull.duration * (0.8 + 0.4*Math.random())
        ));
        this.disposables.push(new Floater(
            this.objects.seagull3,
            config.seagull.amplitude * (0.8 + 0.4*Math.random()),
            config.seagull.duration * (0.8 + 0.4*Math.random())
        ));
        this.disposables.push(new Floater(
            this.objects.seagull4,
            config.seagull.amplitude * (0.8 + 0.4*Math.random()),
            config.seagull.duration * (0.8 + 0.4*Math.random())
        ));
        this.disposables.push(new Floater(
            this.objects.seagull5,
            config.seagull.amplitude * (0.8 + 0.4*Math.random()),
            config.seagull.duration * (0.8 + 0.4*Math.random())
        ));
    },

    disposeScene: function() {
        this.disposables.forEach(function(disposable) {
            disposable.dispose();
        });
    }
});

module.exports = RioScene;
