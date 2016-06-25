var React = require("react");
var ReactDom = require("react-dom");
var Router = require("react-router").Router;
var Route = require("react-router").Route;
var IndexRoute = require("react-router").IndexRoute;
var browserHistory = require("react-router").browserHistory;

var App = require("./app.jsx");
var RioScene = require("./scenes/rioScene.jsx");
var FlightsForm = require("./views/flightsForm.jsx");

window.browserHistory = browserHistory;

ReactDom.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={RioScene} />
            <Route path="form" component={FlightsForm} />
        </Route>
    </Router>
), document.getElementById("app-container"));
