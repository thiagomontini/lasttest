var React = require("react");
var sceneData = require("./sceneData.js");
var createjs = require("./libs/createjs.js");
var Preloader = require("./preloader.jsx");
var RioScene = require("./rioScene.jsx");


var App = React.createClass({
    getInitialState: function() {
        return {
            imageLoader: new createjs.LoadQueue(true),
            progress: 0,
            loading: true
        }
    },

    componentWillMount: function() {
        var manifest = [];
        for (var sceneKey in sceneData) {
            var objects = sceneData[sceneKey]["objects"];
            for (var objectKey in objects) {
                manifest = manifest.concat(objects[objectKey]["images"]);
            }
        }

        this.state.imageLoader.on("progress", this.onLoadingProgress);
        this.state.imageLoader.on("complete", this.onLoadingComplete);
        this.state.imageLoader.loadManifest(manifest);
    },

    onLoadingProgress: function(e) {
        this.setState({
            progress: e.progress
        });
    },

    onLoadingComplete: function(e) {
        this.setState({
            loading: false
        });
    },

    render: function() {
        var loadingProgress = this.state.loading ? <Preloader progress={this.state.progress} /> : null;
        var scene = !this.state.loading ? <RioScene imageLoader={this.state.imageLoader} data={sceneData["rio"]} /> : null;

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
