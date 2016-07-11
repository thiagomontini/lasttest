var React = require("react");

var Preloader = React.createClass({
    getInitialState: function() {
        return {
            progress: this.props.loadQueue.progress
        };
    },

    componentWillMount: function() {
        this.props.loadQueue.on("progress", this.onLoadingProgress);
    },

    componentWillUnmount: function() {
        this.props.loadQueue.off("progress", this.onLoadingProgress);
    },

    onLoadingProgress: function() {
        this.setState({
            progress: this.props.loadQueue.progress
        });
    },

    render: function() {
        return (
            <span>Loading: {Math.floor(100*this.state.progress)} %</span>
        );
    }
});

module.exports = Preloader;
