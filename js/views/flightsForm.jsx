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
var airportData = require("../data/airports.js");
var cultureData = require("../data/cultures.js");
var currencyData = require("../data/currencies.js");

var FlightsForm = React.createClass({
    getInitialState: function() {
        return {
            Origin: null,
            Destination: null,
            SearchLevel: "City",
            ExampleType: null,
            EarliestDepartureDate: null,
            LatestDepartureDate: null,
            MaxResultsCount: null,
            MaxAgeDays: null,
            Currency: null,
            Culture: null
        };
    },

    updateValue: function(field, value) {
        var valueHolder = {};

        valueHolder[field] = value;
        this.setState(valueHolder);
    },

    render: function() {
        return (
            <div className="flights-form">
                <div className="form-row">Origin: <InputSuggest onChange={this.updateValue.bind(this, "Origin")} suggestionDict={airportData} /></div>
                <div className="form-row">Destination: <InputSuggest onChange={this.updateValue.bind(this, "Destination")} suggestionDict={airportData} /></div>
                <div className="form-row">Culture: <InputSuggest onChange={this.updateValue.bind(this, "Culture")} suggestionDict={cultureData} /></div>
                <div className="form-row">Currency: <InputSuggest onChange={this.updateValue.bind(this, "Currency")} suggestionDict={currencyData} /></div>
                <div className="form-row">Earliest Departure Date: <InputDate /></div>
                <div className="form-row"><button>Post</button></div>
            </div>
        );
    }
});

module.exports = FlightsForm;
