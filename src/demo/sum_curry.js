function sum() {
  var sum = [].slice.call(arguments).reduce(function(a, b) {
    return a + b;
  }, 0);
  function innerSum() {
    var next = [].slice.call(arguments).reduce(function(a, b) {
      return a + b;
    }, 0);
    sum += next;
    return innerSum;
  }
  innerSum.valueOf = function() {
    return sum;
  };
  return innerSum;
}

function currying(fn) {
  var args = [].slice.call(arguments, 1);
  return function() {
    var _args = args.concat.call([].slice.call(arguments));
    return fn.apply(null, _args);
  };
}

function _sum() {
  var args = [].slice.call(arguments);
  return args.reduce(function(a, b) {
    return a + b;
  }, 0);
}

var sumCurry = currying(_sum);
var r = sumCurry(1, 2, 3)(4)(5, 6);
