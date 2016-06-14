var React = require("react");
var SceneMixin = require("./sceneMixin.jsx");

var RioScene = React.createClass({
    mixins: [SceneMixin],

    buildScene: function() {
        // The background
        this.stage.addChild(this._buildObject("background"));

        // The hang glider
        this.hangGlider = this._buildObject("hangGlider");
        this.stage.addChild(this.hangGlider);
    },

    disposeScene: function() {

    }
});

module.exports = RioScene;
