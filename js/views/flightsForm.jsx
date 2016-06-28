/*
    Origin – IATA code for the departure airport (e.g. CPH, LON, NYC)
    Destination – IATA code for the destination airport (similar to Origin)
    SearchLevel – City by default
    ExampleType – which type of price example:
    o ReturnCheapest – just provide the cheapest example found
    o ReturnCheapestDirect – cheapest example found but with the requirement of being direct
    o OnewayCheapest – cheapest one way example found
    EarliestDepartureDate – when the departure date should be at the earliest (e.g. 2016-05-11)
    LatestDepartureDate – when the departure date should be at the latest
    MaxResultsCount – how many price examples to ask for
    MaxAgeDays – how old the price example max should be
    Currency – what currency to return prices in – default is EUR
*/

var React = require("react");
var InputSuggest = require("../utils/inputSuggest.jsx");
var InputDate = require("../utils/inputDate.jsx");
var InputNumber = require("../utils/inputNumber.jsx");
var airportData = require("../data/airports.js");
var cultureData = require("../data/cultures.js");
var currencyData = require("../data/currencies.js");

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
            Culture: ""
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
                {JSON.stringify(this.state, null, 4)}
                <div className="form-row">Origin: <InputSuggest onChange={this.updateValue.bind(this, "Origin")} suggestionDict={airportData} /></div>
                <div className="form-row">Destination: <InputSuggest onChange={this.updateValue.bind(this, "Destination")} suggestionDict={airportData} /></div>
                <div className="form-row">Culture: <InputSuggest onChange={this.updateValue.bind(this, "Culture")} suggestionDict={cultureData} /></div>
                <div className="form-row">Currency: <InputSuggest onChange={this.updateValue.bind(this, "Currency")} suggestionDict={currencyData} /></div>
                <div className="form-row">Earliest Departure Date: <InputDate onChange={this.updateValue.bind(this, "EarliestDepartureDate")} /></div>
                <div className="form-row">Latest Departure Date: <InputDate onChange={this.updateValue.bind(this, "LatestDepartureDate")} /></div>
                <div className="form-row"><select onChange={this.onInputChange.bind(this, "ExampleType")}>{exampleTags}</select></div>
                <div className="form-row">How many price examples to ask for: <InputNumber onChange={this.updateValue.bind(this, "MaxResultsCount")} /></div>
                <div className="form-row">How old the price example max should be in days: <InputNumber onChange={this.updateValue.bind(this, "MaxAgeDays")} /></div>
                <div className="form-row"><button>Post</button></div>
            </div>
        );
    }
});

module.exports = FlightsForm;
