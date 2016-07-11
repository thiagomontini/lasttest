var React = require("react");

var Preloader = React.createClass({
    getDefaultProps: function() {
        return {
            progress: 0
        };
    },

    render: function() {
        return (
            <span>Loading: {Math.floor(100*this.props.progress)} %</span>
        );
    }
});

module.exports = Preloader;
