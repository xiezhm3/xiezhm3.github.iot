    if(!Function.prototype.bind) {
        Function.prototype.bind = function() {
            var self = this;
            var context = [].shift.call(arguments);
            var args = [].slice.call(arguments);
            return function() {
                self.apply(context, [].concat.call(args, [].slice.call(arguments)));
            };
        };
    }

    var f1 = f.bind(null, 1);
    f1(2);
