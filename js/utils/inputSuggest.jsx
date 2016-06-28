var React = require("react");

var InputSuggest = React.createClass({
    getDefaultProps: function() {
        return {
            suggestionDict: {},
            minForSuggestions: 3
        };
    },

    getInitialState: function() {
        return {
            text: "",
            suggestionList: []
        };
    },

    setText: function(text) {
        var suggestionList = [];

        var queryRegEx = new RegExp(text.trim().replace(/\s+/g, '\\s+'), "gi");

        if (text.length >= this.props.minForSuggestions && !this.props.suggestionDict[text]) {
            for (var suggestion in this.props.suggestionDict) {
                var match = suggestion.match(queryRegEx);
                if (match) {
                    suggestionList.push(suggestion);
                }
            }
        }

        suggestionList.sort();

        this.setState({
            text: text,
            suggestionList: suggestionList
        });

        if (this.props.onChange) {
            this.props.onChange(this.props.suggestionDict[text]);
        }
    },

    getTextFromField: function() {
        this.setText(this.refs.input.value);
    },

    render: function() {
        var suggestions = this.state.suggestionList.map(function(suggestionText, index) {
            return (
                <div className="suggestion" key={index} onClick={this.setText.bind(this, suggestionText)}>
                    {suggestionText}
                </div>
            );
        }.bind(this));

        var suggestionBox = suggestions.length > 0 ? <div className="suggestion-box">{suggestions}</div> : null;

        var classNames = ["input-suggest"];
        if (this.props.suggestionDict[this.state.text]) {
            classNames.push("valid");
        }

        return (
            <div className={classNames.join(" ")}>
                <input type="text" ref="input" value={this.state.text} onChange={this.getTextFromField} />
                {suggestionBox}
            </div>
        );
    }
});

module.exports = InputSuggest;
