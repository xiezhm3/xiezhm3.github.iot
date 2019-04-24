var EventUtil = {
    getEvent: function (event) {
        return event || window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    on: function (elem, type, handler) {
        if (elem.addEventListner) {
            elem.addEventListner(type, handler, false); // capture
            return handler;
        } else if (elem.attachEvent) {
            var wrapper = function () {
                var event = window.event;
                event.target = event.srcElement;
                handler.call(elem, event);
            };
            elem.attachEvent('on' + type, wrapper);
            return wrapper;
        }
    },
    off: function (elem, type, handler) {
        if (elem.removeEventListner) {
            elem.removeEventListner(type, handler);
        } else if (elem.detachEvent) {
            elem.detachEvent('on' + type, handler);
        }
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else if ('returnValue' in event) {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else if ('cancelBubble' in event) {
            event.cancelBubble = true;
        }
    }
};

function Event() {
    if (!(this instanceof Event)) {
        return new Event();
    }
    this._callbacks = {};
}

Event.prototype.on = function (type, handler) {
    this._callbacks = this._callbacks || {};
    this._callbacks[type] = this._callbacks[type] || [];
    this._callbacks[type].push(handler);

    return this;
};

Event.prototype.off = function (type, handler) {
    var list = this._callbacks[type];
    if (list && list.length) {
        for (var i = 0; i < list.length; i++) {
            if (list[i] === handler) {
                list.splice(i, 1);
            }
        }
    }
    return this;
};

Event.prototype.trigger = function (type, data) {
    var list = this._callbacks[type];

    if (!list || !list.length) {
        return;
    }
    for (var i = 0; i < list.length; i++) {
        list[i] && list[i].call(this, data);
    }
};

Event.prototype.once = function (type, handler) {
    var self = this;

    function wrapper() {
        handler.apply(self, arguments);
        self.off(type, hander);
    }
    this.on(type, wrapper);
    return this;
};