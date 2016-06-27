var React = require("react");
var ReactDom = require("react-dom");
var Router = require("react-router").Router;
var Route = require("react-router").Route;
var IndexRoute = require("react-router").IndexRoute;
var browserHistory = require("react-router").browserHistory;

var App = require("./app.jsx");
var Home = require("./views/home.jsx");
var RioScene = require("./scenes/rioScene.jsx");
var FlightsForm = require("./views/flightsForm.jsx");

ReactDom.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="form" component={FlightsForm} />
            <Route path="rio" component={RioScene} />
        </Route>
    </Router>
), document.getElementById("app-container"));
