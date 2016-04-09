function coroutine(g) {
  var it = g();
  return function() {
    return it.next.apply(it, arguments);
  }
}

var run = coroutine(function* () {
  // When the program reaches the yield keyword, it's pausing the
  // program and expecting a value so it can complete the expression
  // 1 + __
  // Think of it as asking the question, "What value do I use for yield?"
  // That question is answered by the argument used in the next run call
  // a few lines below, run (10)
  var x = 1 + (yield);
  var y = 1 + (yield);
  // We are now yielding an immediately calculated value of
  // the above two expressions 11 + 31. This value is accessed
  // with .value on the last line of this program below.
  // The full object of calling run(30) is {value: 42, done: false}
  yield (x + y);
});

// When run() is first executed, control of the program goes to line 9.
// The program is then yielded back to the call site as this object:
// Object {value: undefined, done: false}
// the value is undefined because no value was yielded.
// done is false because there are still unexecuted lines
// in the generator function
run();
// The value 10 is passed to the first yield keyword above which allows
// the program to complete the expression 1 + 10 and move on to the next
// expression, where this process is repeated.
run(10);
// run(30) answeres the question "What value should I use for yield?" posed by the
// second yield keyword in the generator function above and completes the expression
// as 1 + 30
console.log(`Meaning of life: ${run(30).value}`);

// NOTE: although we have reached the final possible value of the run generator function,
// it is technically not finished and will remain in a paused state unless called again.
// Generators are not required to run to completion aka done: true
// - it is ok to only partially consume a generator
// - when reference to the generator is discarded it will be garbage collected.
