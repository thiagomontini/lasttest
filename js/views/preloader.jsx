var React = require("react");

var Preloader = React.createClass({
    render: function() {
        var progress;

        if (this.props.progress == undefined) {
            progress = null;
        }
        else {
            progress = Math.floor(100*this.props.progress) + " %";
        }

        return (
            <span>Loading... {progress}</span>
        );
    }
});

module.exports = Preloader;
