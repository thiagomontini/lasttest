var React = require("react");

var InputNumber = React.createClass({
    getInitialState: function() {
        return {
            value: ""
        };
    },

    onInputChange: function(event) {
        var newValue = event.target.value.replace(/\D/g,"");
        this.setState({
            value: newValue
        });

        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    },

    render: function() {
        return <input type="text" onChange={this.onInputChange} value={this.state.value} />;
    }
});

module.exports = InputNumber;
