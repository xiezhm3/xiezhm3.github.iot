export function runPrimiseInSequence(arr, input) {
  return arr.reduce(
    (promiseChain, currentPromise) => promiseChain.then(() => currentPromise),
    Promise.resolve(input)
  );
}
