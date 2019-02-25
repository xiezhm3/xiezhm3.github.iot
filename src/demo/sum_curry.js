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

function currying_(fn) {
  let allArgs = [];
  return function next() {
    let args = [].slice.call(arguments);
    if (args.length) {
      allArgs = allArgs.concat(args);
      console.log(allArgs);
      return next;
    } else {
      fn.apply(null, allArgs);
    }
  };
}

var add = currying_(function() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    console.log(sum);
    sum += arguments[i];
  }
  return sum;
});
