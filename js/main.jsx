var React = require("react");
var ReactDom = require("react-dom");
var Router = require("react-router").Router;
var Route = require("react-router").Route;
var IndexRoute = require("react-router").IndexRoute;
var browserHistory = require("react-router").browserHistory;

var Home = require("./views/home.jsx");
var Globe = require("./views/globe.jsx");
var RioScene = require("./scenes/rioScene.jsx");
var NYScene = require("./scenes/nyScene.jsx");
var FlightsForm = require("./views/flightsForm.jsx");

var config = require("./config.js");

ReactDom.render((
    <Router history={browserHistory}>
        <Route path={config.root + "/"} component={Home} />
        <Route path={config.root + "/globe"} component={Globe} />
        <Route path={config.root + "/globe/:renderer"} component={Globe} />
        <Route path={config.root + "/form"} component={FlightsForm} />
        <Route path={config.root + "/rio"} component={RioScene} />
        <Route path={config.root + "/ny"} component={NYScene} />
    </Router>
), document.getElementById("app-container"));
