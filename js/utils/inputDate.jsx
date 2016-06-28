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

    componentDidMount: function() {
        this.fireChangeEvent();
    },

    changeDate: function(selectedDate) {
        this.setState({
            date: selectedDate.toDate(),
            showPicker: false
        });

        this.fireChangeEvent();
    },

    fireChangeEvent: function() {
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
                    selectedDate={this.state.date}
                    afterSelect={this.changeDate}
                    min={new Date(today.getFullYear(), today.getMonth(), 1)}
                    max={new Date(today.getFullYear(), today.getMonth()+6, 1)}
                    minDate={new Date()}
                    width={600}
                    height={330}
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
