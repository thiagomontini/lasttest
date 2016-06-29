var React = require("react");
var sceneData = require("./sceneData.js");
var SceneMixin = require("./sceneMixin.jsx");

var NYScene = React.createClass({
    sceneKey: "ny",

    mixins: [SceneMixin],

    initScene: function() {
        this.disposables = [];
    },

    disposeScene: function() {
        this.disposables.forEach(function(disposable) {
            disposable.dispose();
        });
    }
});

module.exports = NYScene;
