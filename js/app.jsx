var React = require("react");
var PIXI = require("pixi.js");
var sceneData = require("./sceneData.js");
var createjs = require("./libs/createjs/createjs.js");
var Preloader = require("./preloader.jsx");
var RioScene = require("./rioScene.jsx");


var App = React.createClass({
    getInitialState: function() {
        return {
            progress: 0,
            loading: true
        }
    },

    componentWillMount: function() {
        // Builds a list of the images to be loaded
        for (var sceneKey in sceneData) {
            var objects = sceneData[sceneKey]["objects"];
            this.manifest = objects.map(function(x) {return x["images"]}).reduce(function(a, b){return a.concat(b);});
        }

        // Removes the repeated items
        this.manifest.sort();
        var m = [];
        for (var i=0; i < this.manifest.length; i++) {
            if (i==0 || this.manifest[i-1] != this.manifest[i]) {
                m.push(this.manifest[i]);
            }
        }
        this.manifest = m;

        // Builds the image loader and loads the images
        this.imageLoader = new createjs.LoadQueue(true);
        this.imageLoader.on("progress", this.onLoadingProgress);
        this.imageLoader.on("complete", this.onLoadingComplete);
        this.imageLoader.loadManifest(this.manifest);
    },

    onLoadingProgress: function(e) {
        this.setState({
            progress: e.progress
        });
    },

    onLoadingComplete: function(e) {
        // Builds the texture cache
        this.textureCache = {};
        for (var i=0; i < this.manifest.length; i++) {
            var k = this.manifest[i];
            var imageAsset = this.imageLoader.getResult(k);
            this.textureCache[k] = new PIXI.Texture(new PIXI.BaseTexture(imageAsset));
        }

        this.setState({
            loading: false
        });
    },

    render: function() {
        var loadingProgress = this.state.loading ? <Preloader progress={this.state.progress} /> : null;
        var scene = !this.state.loading ? <RioScene textureCache={this.textureCache} data={sceneData["rio"]} /> : null;

        return (
            <div>
                {loadingProgress}
                <div className="scene-container">
                    {scene}
                </div>
            </div>
        );
    }
});

module.exports = App;
