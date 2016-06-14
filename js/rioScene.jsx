var React = require("react");
var PIXI = require("pixi.js");
var SceneMixin = require("./sceneMixin.js");
var sceneData = require("./sceneData.js");

var RioScene = React.createClass({
    mixins: [SceneMixin],

    componentDidMount: function() {
        // Initializes the PIXI environment
        this.initPixi();

        // What to do when the window resizes
        this.startResizeListener();
    },

    componentWillUnmount: function() {
        // Cleanups
        this.finishPixi();
        this.clearResizeListener();
    },

    render: function() {
        return <canvas ref="canvas" />;
    }
});

module.exports = RioScene;
