var React = require("react");
var InputSuggest = require("../utils/inputSuggest.jsx");
var InputDate = require("../utils/inputDate.jsx");
var InputNumber = require("../utils/inputNumber.jsx");
var airportData = require("../data/airports.js");
var cultureData = require("../data/cultures.js");
var currencyData = require("../data/currencies.js");
var flightPriceApi = require("../apis/flightPriceApi.js");


var FlightsForm = React.createClass({
    getInitialState: function() {
        return {
            Origin: "",
            Destination: "",
            SearchLevel: "City",
            ExampleType: "ReturnCheapest",
            EarliestDepartureDate: "",
            LatestDepartureDate: "",
            MaxResultsCount: "",
            MaxAgeDays: "",
            Currency: "",
            Culture: "",

            result: null,
            fetching: false
        };
    },

    updateValue: function(field, value) {
        var valueHolder = {};

        valueHolder[field] = value;
        this.setState(valueHolder);
    },

    onInputChange: function(field, event) {
        this.updateValue(field, event.target.value);
    },

    getFlights: function() {
        if (this.state.fetching) {
            return;
        }

        var params = {
            Origin: "",
            Destination: "",
            SearchLevel: "City",
            ExampleType: "ReturnCheapest",
            EarliestDepartureDate: "",
            LatestDepartureDate: "",
            MaxResultsCount: "10",
            MaxAgeDays: "10",
            Currency: "USD",
            Culture: "en-US",
        };

        for (var key in params) {
            params[key] = this.state[key] || params[key];
        }

        flightPriceApi.getAll(params).then(function(response) {
            var resultData = response.body().map(function(entity) {
                return entity.data();
            });

            this.setState({
                result: resultData,
                fetching: false
            });
        }.bind(this));

        this.setState({
            fetching: true
        });
    },

    render: function() {
        var exampleOptions = {
            "ReturnCheapest": "Just provide the cheapest example found",
            "ReturnCheapestDirect": "Cheapest example found but with the requirement of being direct",
            "OnewayCheapest": "Cheapest one way example found"
        };

        var exampleTags = [];
        for (var key in exampleOptions) {
            exampleTags.push(<option key={key} value={key}>{exampleOptions[key]}</option>);
        }

        return (
            <div className="flights-form">
                <div className="form-row">Origin: <InputSuggest onChange={this.updateValue.bind(this, "Origin")} suggestionDict={airportData} /></div>
                <div className="form-row">Destination: <InputSuggest onChange={this.updateValue.bind(this, "Destination")} suggestionDict={airportData} /></div>
                <div className="form-row">Culture: <InputSuggest onChange={this.updateValue.bind(this, "Culture")} suggestionDict={cultureData} /></div>
                <div className="form-row">Currency: <InputSuggest onChange={this.updateValue.bind(this, "Currency")} suggestionDict={currencyData} /></div>
                <div className="form-row">Earliest Departure Date: <InputDate onChange={this.updateValue.bind(this, "EarliestDepartureDate")} /></div>
                <div className="form-row">Latest Departure Date: <InputDate onChange={this.updateValue.bind(this, "LatestDepartureDate")} /></div>
                <div className="form-row"><select onChange={this.onInputChange.bind(this, "ExampleType")}>{exampleTags}</select></div>
                <div className="form-row">How many price examples to ask for: <InputNumber onChange={this.updateValue.bind(this, "MaxResultsCount")} /></div>
                <div className="form-row">How old the price example max should be in days: <InputNumber onChange={this.updateValue.bind(this, "MaxAgeDays")} /></div>
                <div className="form-row"><button className={this.state.fetching ? "disabled" : ""} onClick={this.getFlights}>Get flights</button></div>
                <div className="result"><pre>{JSON.stringify(this.state.result, null, 4)}</pre></div>
            </div>
        );
    }
});

module.exports = FlightsForm;
