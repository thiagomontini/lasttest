var React = require('react');
var ReactDom = require('react-dom');

var App = React.createClass({
    render: function() {
        return <div>Spin the Globe - for Cheapflights</div>;
    }
});

ReactDom.render(<App />, document.getElementById("app-container"));
