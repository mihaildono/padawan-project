# Introduction
> "Truly wonderful, the mind of a child is." <br/>
> ―Yoda

The computer thinks in a logical way. Humans do not. The biggest challenges for
a developer who is just starting out is learning basic algorithmic thinking and
the related vocabulary.
The introduction part of JS is split into two parts - arrays and objects, as
those are the basic data structures of the language. There will be sample
explanations, but mentors are encouraged to give their own.

*Using internet for help is not advised in this section

# Prerequisites
* [Install][node] NodeJS
  This is the environment that allows you to execute your javascript code
* [Install][vscode] VisualStudio Code
  This is your editor where you can effeciently modify your code
* To use the [REPL][repl] and instantly execute JS expressions, open your console and type:
```sh
$ node
```
  * To execute code from a file(filename must end with .js extension), open your console and type:
```sh
$ node path/to/file/file.js
```

## Booleans
Booleans is a data type which is either `true` or `false`. Everything in
javascript also evaluates to true, except `false` `0` `-0` `0n` `""` `null`
`undefined` and `NaN`. For example the string 'Foo' and the integer '5' will both be true.

## Logical Operators
Logical operators are used to determine the logic between variables or values.
They are `&&`(and), `||`(or) and `!`(not).

## Variables
Variables are containers for storing data values. They can be defined via the
keywords 'const', 'let' and 'var'. 'const' is immutable, which means it can't be
changed. To `assign` a value to a `variable` use '=':
```js
let name = 'George'
const ageOfGeorge = 16
```

## Functions
Functions are a collection of code that we want to reuse.
There are two ways to define a function:

1. `const <funcName> = (<param1>, <param2>) => {}`
2. `function <funcName>(<params...>) {}`

Throughout the project the student will use the first way.
`const` is a language keyword which means we `define` a new `variable`. Then we
have the function name, followed by `=` and the `paramaters` enclosed in
parantheses. Finally we have the special syntax `=>`: this is called an arrow
function. The `{}` defines a `block` scope.
This is a sample function which sums two numbers:
```js
const add = (a, b) => {
    return a + b
}

add(5, 6) // 11
```
The example file in this directory contains the same code, to run it use:
```sh
$ node example.js
```
###### Exercises
1. Celsius to Fahrenheit converter

## Conditional Statements:
Sometimes we want to split the flow of our application depending on the result of an expression. We do this with the keywords `if` and `else`.
```js
if (true) {
    // do something
} else {
    // do something else
}
```
If we want to check if something is equal to something else we use `===`
```js
const name = 'Foo'

if (name === 'Foo') {
    return 'Awesome!'
}
```

###### Exercises
1. Check if a number is even or not
2. Check if word begins with 'F'

## Debugging
1. put keyword `debugger` in code and execute the file(works for server applications).
2. put `console.log()`
3. Execute single expressions in console using `node` or press F12 in browser to open console.

## Array
An array is a special variable, which can hold values under a single name. You
can access the values by referring to an index number. Array is denoted by the
symbols `[]`

Lottary example: [69, 31, 56, 76, 22]

To take element of an array: <arrayName>[<number>]
```js
const arr = [69, 31, 56, 76, 22]
arr[0] // 69
arr[3] // 76
arr[100] // undefined
```

To add an element to specific index, we use the index number and `=` sign. If we want to append to the end of the array we can use the predifined `push` function for the array.
```js
arr[100] = 666
arr[100] // 666
arr.push(7)
arr[101] // 7
```

## Loops
Sometimes we want to `iterate` through a collection and perform the an action
for every element and not go through them individually. These constructs are
called `loops`. Initially we will use the `for` loop. This is a mechanism which increments a certain `variable` by a specific value. For example if we have an array with length 10 and we want to go through the whole thing, we start at index 0, go through each number until we reach index 9. This is an example `for loop`:
```js
for (i = 0; i < 5; i++) {
    arr[i] // arr[0] => 69, arr[1] => 31 ...
}
```

The construct starts with keyword `for`, then we have 3 parts: start of
iteration `i = 0`, end of iteration `i < 5`, and finally how to increment it `i++`(this is the same as to write `i = i + 1`). With this, in the enclosing `block`, we get a variable `i`, which will change it's value 5 times -> 0, 1, 2, 3, 4. Notice that in the brackets `[]`, we can write not only numbers, but also variables, that evaluate to numbers. **IMPORTANT** `for loop` changes the value of `i`, if we want to take the current value of the array we must use `arr[i]`.

###### Exercises
1. Create an array with 5 values and console log each value
2. Console log the previous array in reverse order

Run through the following [exercises][exArr]

## Object
Sometimes we want to access a specific value in a data structure, and not just
store elements in an unorganized way like arrays. This is where objects come in. Here we define a `key` and a `value`. Behind every `key` we can select, there is a `value` that we can access:
obj = { <key1>: <value1>, <key2>: <value2> }
```js
const george = { 'name': 'George', 'gender': 'male' }
const maria = { 'name': 'Maria', 'gender': 'female' }
george['gender'] // male
maria['gender'] // female
george['height'] // undefined
george['height'] = 180
george['height'] // 180
george['height'] = 190
george['height'] // 190
```
To get all the keys or values in an array of an object we can use `.keys` and `.values`

```js
george.keys // ['gender', 'name', 'height']
obj.values // ['male', 'George', '190']
```

Run through the following [exercises][exObj]

## Mastermind Trial
Complete the [final][final] exercise and earn the badge "Mastermind".

When finished with the trial, head over to the [padawan][padawan] section to
start creating real-world applications.

### Common pitfalls
* Always return something
* Index in a for loop, does not actually take an item, but rather points towards
  the current item
* Map is very confusing when first switched form for loop. Repetition is key!
* Keys for objects and Indexes for arrays, can be used with variables that
  evaluate to a string/number

### Vocabulary
* Declaration
This is where you intially define a piece of code.
* Implementation
How a piece of code is implemented(written down)
* Iterate
Go through all items of a collection
* Primitives
Most basic piece of informational building block eg.: 1, 'George'
* Paramater
A variable which is not being defined by the function, but passed to from another piece of code
* Block({})
This encloses definitions of variables. If we have variable `const i = 10` in one block, in another it would equal `undefined`, unless redefined
* Data structure
A set of structured data of primitives

[node]: https://nodejs.org/en/
[vscode]: https://code.visualstudio.com/
[repl]: https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop
[exArr]: https://github.com/mihaildono/padawan-project/blob/master/youngling/array-tasks.md
[exObj]: https://github.com/mihaildono/padawan-project/blob/master/youngling/object-tasks.md
[final]: https://github.com/mihaildono/padawan-project/blob/master/youngling/snake-task.md
[padawan]: https://github.com/mihaildono/padawan-project/blob/master/padawan/introduction.md
