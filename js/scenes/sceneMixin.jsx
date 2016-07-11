var React = require("react");
var PIXI = require("pixi.js");
var Preloader = require("../views/preloader.jsx");
var createjs = require("../libs/createjs/createjs.js");
var sceneData = require("./sceneData.js");
var loadQueues = require("../utils/loadQueues.js");

module.exports = {
    getInitialState: function() {
        return {
            progress: 0,
            loading: !(loadQueues[this.sceneKey] && loadQueues[this.sceneKey].loaded),
            scale: this._computeScale()
        }
    },

    _computeScale: function() {
        return Math.max(
            window.innerWidth / sceneData[this.sceneKey].sceneWidth,
            window.innerHeight / sceneData[this.sceneKey].sceneHeight
        );
    },

    _buildObject: function(objectData) {
        var object;
        var loadQueue = loadQueues[this.sceneKey];
        var textures = objectData.images.map(function(x) {
            var imageAsset = loadQueue.getResult(x);
            return new PIXI.Texture(new PIXI.BaseTexture(imageAsset));
        });

        if (textures.length > 1) {
            object = new PIXI.extras.MovieClip(textures);
        }
        else {
            object = new PIXI.Sprite(textures[0]);
        }

        var position = objectData.position || [0, 0];
        object.x = position[0];
        object.y = position[1];

        object.anchor.x = object.anchor.y = 0;

        return object;
    },

    componentWillMount: function() {
        if (!loadQueues[this.sceneKey]) {
            // Builds a list of the images to be loaded
            var objects = sceneData[this.sceneKey]["objects"];
            var manifest = objects
                    .map(function(x) { return x["images"] })
                    .reduce(function(a, b){ return a.concat(b) })

            // Removes the repeated items
            manifest.sort();
            var m = [];
            for (var i=0; i < manifest.length; i++) {
                if (i==0 || manifest[i-1] != manifest[i]) {
                    m.push(manifest[i]);
                }
            }
            manifest = m;

            // Builds the image loader and loads the images
            loadQueues[this.sceneKey] = new createjs.LoadQueue(true);
            loadQueues[this.sceneKey].loadManifest(manifest);
        }
    },

    componentDidMount: function() {
        if (loadQueues[this.sceneKey].loaded) {
            this.onLoadingComplete();
        }
        else {
            this.progressListener = loadQueues[this.sceneKey].on("progress", this.onLoadingProgress);
            this.completeListener = loadQueues[this.sceneKey].on("complete", this.onLoadingComplete);
        }
    },

    onLoadingProgress: function() {
        this.setState({
            progress: loadQueues[this.sceneKey].progress
        });
    },

    onLoadingComplete: function() {
        // Create a renderer instance
        this.renderer = new PIXI.CanvasRenderer(sceneData[this.sceneKey].sceneWidth, sceneData[this.sceneKey].sceneHeight, { // or autoDetectRenderer
            view: this.refs.canvas
        });

        // The main PIXI container
        this.stage = new PIXI.Container();
        this.stage.interactive = true;
        this.stage.on("mousedown", this.onStageClick);
        this.stage.on("touchstart", this.onStageClick);

        // Builds the objects from the scene
        this.objects = {};
        for (var i=0; i < sceneData[this.sceneKey].objects.length; i++) {
            var o = sceneData[this.sceneKey].objects[i];
            var newObject = this._buildObject(o);
            this.stage.addChild(newObject);
            this.objects[o.id] = newObject;
        }

        // Additional initialization for the scene (start tweens, etc.), if any
        if (this.initScene) {
            this.initScene();
        }

        // Builds the hit areas
        this.hitAreas = sceneData[this.sceneKey].hitAreas.map(function(areaObject) {
            return {
                "description": areaObject.description,
                "object": this.objects[areaObject.object],
                "polygon": new PIXI.Polygon(areaObject.polygon)
            }
        }.bind(this));

        // Starts the animation
        this.animationTick();

        // What to do when the window resizes
        window.addEventListener("resize", this.onWindowResize);

        // Updates the state
        this.setState({
            loading: false
        });
    },

    onStageClick: function(e) {
        var clickPos = e.data.getLocalPosition(this.stage);

        for (var i=0; i < this.hitAreas.length; i++) {
            var area = this.hitAreas[i];
            if (area.polygon.contains(clickPos.x, clickPos.y)) {
                window.alert(area.description);
                break;
            }
        }
    },

    animationTick: function(timestamp) {
        // Renders the PIXI canvas
        this.renderer.render(this.stage);

        // Request the next frame
        this.animationId = requestAnimationFrame(this.animationTick);
    },

    onWindowResize: function() {
        this.setState({
            scale: this._computeScale()
        });
    },

    componentWillUnmount: function() {
        // Clears the listeners from the loading queue
        // If the route changes while the images are being loaded,
        // the loading can continue but no event should be triggered
        loadQueues[this.sceneKey].off("progress", this.progressListener);
        loadQueues[this.sceneKey].off("complete", this.completeListener);

        // Stops the animation
        cancelAnimationFrame(this.animationId);

        // Removes the resize listener
        window.removeEventListener("resize", this.onWindowResize);

        // Do particular cleanups for a scene, if any
        if (!this.state.loading && this.disposeScene) {
            this.disposeScene();
        }
    },

    render: function() {
        var preloader;
        if (this.state.loading) {
            preloader = <Preloader progress={this.state.progress} />;
        }
        else {
            preloader = null;
        }

        var style = {
            display: this.state.loading ? "none" : "block",
            transform: "scale(" + this.state.scale + ")"
        };

        style.WebkitTransform = style.transform;

        return (
            <div className="scene-container">
                {preloader}
                <canvas className="scene" style={style} ref="canvas" />
            </div>
        );
    }
};
