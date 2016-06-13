var EventDispatcher = function() {
    this.eventListeners = {};
};

EventDispatcher.prototype = {
    addEventListener: function(name, listener) {
        var listeners = this.eventListeners[name];
        if (!listeners) {
            listeners = this.eventListeners[name] = [];
        }
        listeners.push(listener);
    },

    removeEventListener: function(name, listener) {
        var listeners;
        if (!(listeners = this.eventListeners[name])) {
            return;
        }

        var eventIndex = listeners.indexOf(listener);
        if (eventIndex < 0) {
            return;
        }

        listeners.splice(eventIndex, 1);
        if (listeners.length == 0) {
            delete this.eventListeners[name];
        }
    },

    dispatchEvent: function(name, parameters) {
        var listeners = this.eventListeners[name];
        if (!listeners) {
            return;
        }

        for (var i in listeners) {
            listeners[i].apply(null, parameters);
        }
    }
};

module.exports = new EventDispatcher();
