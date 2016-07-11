var React = require("react");
var ReactDom = require("react-dom");
var Router = require("react-router").Router;
var Route = require("react-router").Route;
var IndexRoute = require("react-router").IndexRoute;
var browserHistory = require("react-router").browserHistory;

var Home = require("./views/home.jsx");
var RioScene = require("./scenes/rioScene.jsx");
var NYScene = require("./scenes/nyScene.jsx");
var FlightsForm = require("./views/flightsForm.jsx");

ReactDom.render((
    <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/form" component={FlightsForm} />
        <Route path="/rio" component={RioScene} />
        <Route path="/ny" component={NYScene} />
    </Router>
), document.getElementById("app-container"));
