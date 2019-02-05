export function runPrimiseInSequence(arr, input) {
  return arr.reduce(
    (promiseChain, currentPromise) => promiseChain.then(() => currentPromise),
    Promise.resolve(input)
  );
}

//reduce method

/*arr.reduce(callback[, initialValue]);
arguments:
    callback:
        accumulator, currentValue, currentIndex(optional), originArray(optional)
    initianValue
*/
