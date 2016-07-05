var React = require("react");
var Link = require("react-router").Link;
var sceneData = require("../scenes/sceneData.js");
var config = require("../config.js");

var Home = React.createClass({
    render: function() {
        var sceneLinks = [];

        for (var sceneKey in sceneData) {
            sceneLinks.push(
                <li key={sceneKey}>
                    <Link to={config.root + "/" + sceneKey}>
                        {sceneData[sceneKey].name}
                    </Link>
                </li>
            );
        }

        return (
            <span>
                Choose a scene:
                <ul>
                    {sceneLinks}
                </ul>
                <hr/>
                Other views:
                <ul>
                    <li>
                        <Link to={config.root + "/form"}>API form</Link>
                    </li>
                </ul>
            </span>
        );
    }
});

module.exports = Home;
