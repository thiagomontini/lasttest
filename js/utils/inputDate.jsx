var React = require("react");
var InfiniteCalendar = require("react-infinite-calendar")['default'];

function dateToText(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

var InputDate = React.createClass({
    getInitialState: function() {
        return {
            date: new Date(),
            showPicker: false
        };
    },

    changeDate: function(selectedDate) {
        this.setState({
            date: selectedDate.toDate(),
            showPicker: false
        });

        if (this.props.onChange) {
            this.props.onChange(dateToText(this.state.date));
        }
    },

    togglePicker: function() {
        this.setState({
            showPicker: !this.state.showPicker
        });
    },

    render: function() {
        var calendar = null;
        var today = new Date();

        if (this.state.showPicker) {
            calendar = (
                <InfiniteCalendar
                    className="input-date-picker"
                    width="100%"
                    selectedDate={this.state.date}
                    afterSelect={this.changeDate}
                    min={new Date(today.getFullYear(), today.getMonth(), 1)}
                    max={new Date(today.getFullYear()+1, today.getMonth(), 1)}
                    layout="landscape" />
            );
        }
        return (
            <div className="input-date">
                <div className="static-input" onClick={this.togglePicker}>{dateToText(this.state.date)}</div>
                {calendar}
            </div>
        );
    }
});

module.exports = InputDate;
