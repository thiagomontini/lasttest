var React = require("react");
var ReactDom = require("react-dom");
var PIXI = require("pixi.js");
var sceneData = require("./scenes/sceneData.js");
var RioScene = require("./scenes/rioScene.jsx");
var createjs = require("./libs/createjs/createjs.js");
var Preloader = require("./views/preloader.jsx");
var InputSuggest = require("./utils/inputSuggest.jsx");
var airportData = require("./data/airports.js");
var cultureData = require("./data/cultures.js");
var currencyData = require("./data/currencies.js");


var App = React.createClass({
    getInitialState: function() {
        return {
            progress: 0,
            loading: true,
            sceneSelected: null
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

    setScene: function(sceneKey) {
        this.setState({
            scene: sceneKey
        });
    },

    render: function() {
        var loadingProgress = this.state.loading ? <Preloader progress={this.state.progress} /> : null;

        var homeForm = null;
        if (!this.state.loading && !this.state.scene) {
            var sceneLinks = [];
            for (var sceneKey in sceneData) {
                sceneLinks.push(
                    <li key={sceneKey}>
                        <span className="scene-link" onClick={this.setScene.bind(this, sceneKey)}>{sceneData[sceneKey].name}</span>
                    </li>
                );
            }
            homeForm = (
                <div>
                    Choose a scene:
                    <ul>
                        {sceneLinks}
                    </ul>
                    <br/>
                    Airport: <InputSuggest suggestionDict={airportData} /><br/><br/>
                    Culture: <InputSuggest suggestionDict={cultureData} /><br/><br/>
                    Currency: <InputSuggest suggestionDict={currencyData} /><br/><br/>
                </div>
            );
        }

        var scene = null;
        if (!this.state.loading && this.state.scene) {
            switch (this.state.scene) {
                case 'rio':
                    scene = <RioScene textureCache={this.textureCache} data={sceneData["rio"]} />;
                    break;
            }

            scene = <div className="scene-container">{scene}</div>;
        }

        return (
            <div>
                {loadingProgress}
                {homeForm}
                {scene}
            </div>
        );
    }
});

ReactDom.render(<App />, document.getElementById("app-container"));
