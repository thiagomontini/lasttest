var React = require("react");
var PIXI = require("pixi.js");
var config = require("./config.js");

module.exports = {
    _computeScale: function() {
        return Math.min(window.innerWidth / config.baseWidth, window.innerHeight / config.baseHeight);
    },

    _buildObject: function(objectData) {
        var textures = objectData.images.map(function(x) {
            return this.props.textureCache[x];
        }.bind(this));
        if (textures.length > 1) {
            object = new PIXI.MovieClip(textures);
        }
        else {
            object = new PIXI.Sprite(textures[0]);
        }

        var position = objectData.position || [0, 0];
        object.x = position[0];
        object.y = position[1];

        return object;
    },

    getInitialState: function() {
        return {
            scale: this._computeScale()
        };
    },

    componentDidMount: function() {
        // // Creates the hit areas
        // this.areas = [];
        // for (var areaId in this.props.data.hitAreas) {
        //     this.areas.push({
        //         id: areaId,
        //         polygon: new PIXI.Polygon(this.props.data.hitAreas[areaId])
        //     });
        // }

        // Create a renderer instance
        this.renderer = new PIXI.CanvasRenderer(config.baseWidth, config.baseHeight, { // or autoDetectRenderer
            view: this.refs.canvas
        });

        // The main PIXI container
        this.stage = new PIXI.Container();
        this.stage.interactive = true;
        this.stage.on("mousedown", this.onStageClick);

        // Builds the objects from the scene
        this.objects = {};
        for (var i=0; i < this.props.data.objects.length; i++) {
            var o = this.props.data.objects[i];
            var newObject = this._buildObject(o);
            this.stage.addChild(newObject);
            this.objects[o.id] = newObject;
        }

        // Additional initialization for the scene (fire tweens, etc.), if any
        if (this.initScene) {
            this.initScene();
        }

        // Starts the animation
        this.animationTick();

        // What to do when the window resizes
        window.addEventListener("resize", this.onWindowResize);
    },

    onStageClick: function(e) {
        var clickPos = e.data.getLocalPosition(this.stage);

        // for (var i=0; i < this.areas.length; i++) {
        //     if (this.areas[i].polygon.contains(clickPos.x, clickPos.y)) {
        //         window.alert(this.areas[i].id);
        //         break;
        //     }
        // }
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
        // Stops the animation
        clearAnimationFrame(this.animationId);

        // Removes the resize listener
        window.removeEventListener("resize", this.onWindowResize);

        // Do particular cleanups for a scene, if any
        if (this.disposeScene) {
            this.disposeScene();
        }
    },

    render: function() {
        var style = {
            transform: "scale(" + this.state.scale + ")"
        };

        style.WebkitTransform = style.transform;

        return <canvas className="scene" style={style} ref="canvas" />;
    }
};
