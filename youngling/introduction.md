# Introduction
> "Truly wonderful, the mind of a child is." <br/>
> ―Yoda

The computer thinks in a logical way. Humans do not. The biggest challenges for
a developer who is just starting out is learning basic algorithmic thinking and
the related vocabulary.There will be sample explanations, but mentors are encouraged to give their own.

*Using internet for help is not advised in this section

# Helpful links
- [Common Pitfalls][pitfalls]
- [Vocabulary][vocabulary]
- [Best Practices][best-practices]
- [Basic-Cheatsheet][basic-cheatsheet]

# Prerequisites
* Make an account for [jsfiddle][jsfiddle]
  This is an website that makes it super easy to run JavaScript code.

## The basics
 - We program using a language called **JavaScript**. What do you think is a programming language?
 - We use [jsfiddle][jsfiddle] to run JavaScript code. It's a website that let's you write JavaScript code and play with it.
 - How can we see what our program does? There is a difference between telling the computer to sum `5 + 5` and to making it to show you what the result is `=> 10`. We use **console.log** to visualize something in the console.
 - What is a **console**? A console is a program that makes it easy to play with the programming language. We will use a JavaScript console.
 - What is an **error**? When the code that we right cannot be understand by the programming language, the program returns an error and stops execution.

###### Exercises
 <details>
  <summary>Write in the console the text "Hello world"</summary>
  <p>

  ```js
  console.log("Hello world")
  ```
  </p>
 </details>

## Types
In *JavaScript* and in programming in general, the most simple piece of information is expressed
via primitive data types. They are **String** and **Number**. Let's see some examples:

### Number
```
console.log(3)
```
`3` is a number

We can:
 - Sum two numbers: `3 + 4`
 - Sum many numbers: `1 + 3 + 5 + 1`
 - Difference numbers: `5 - 5 - 1`
 - Multiply, divide, ...
 - We can have a combination of all: `3 - 3 * 1 / 1`

### String
Strings are combinations of letters(chars), therefore it's just a text.

```
console.log("I'm a string")
```
`"I'm a string"` is a string

We can also concatenate(join) strings: `"baby " + "Yoda"`:

###### Exercises
Run through the following [exercises][exTypes]

## Variable
A variable is a container for storing data values.

You can think of variables as "named boxes". You can put things inside the box and you can refer to them with the name of the box.

- The box has to **have a name**, because you want to distinguish it from the other boxes.
- The box can be empty, but if you don't fill it with something it isn't very useful.

You can do the following things with a variable:

- Creating it - it's called "variable declaration"
```js
let newVariable
```

- Passing it a value - it's called "value assignment". To `assign` a value to a `variable` use '='
```js
let myNumber
myNumber = 44
console.log(myNumber) // => 44
```

- Creating **and** passing a value
```js
let myNumber = 44
console.log(myNumber) // => 44
```

Variables can be defined via the keywords `let` and `const`. The difference is that `const` is immutable, which means it can't be changed.

You can try but the computer will return an error:
```js
const newPizza = 'yummy'
newPizza = 'cold as hell' // !!! ERROR: Uncaught TypeError: Assignment to constant variable
```

###### Exercises
Run through the following [exercises][exVar]

## Functions
Functions are a collection of code that we want to reuse.

When we watch TV, we do not build the TV each time before watching something, we
reuse the same package(TV box) each time.

To define a function:

1. `const <funcName> = (<param1>, <param2>) => { return <result> }`

*NOTE:* We use the syntax `<>` for illustrating user-created custom names and `<>` is not part of the JavaScript language.

This is a sample function which sums two numbers:
```js
const add = (a, b) => {
    return a + b
}

add(5, 6) // => 11
```
You can see that the first part `(a, b) => {...}` creates the function and assigns it to the variable `add`.
And `add(5, 6)` executes it, which means it makes the computer run the code inside the function's body.
Let's see what are the steps that the *computer* will do when we write `const result = add(5, 6)`:
 - `a = 5`
 - `b = 6`
 - `return a + b` => `return 5 + 6`
 - `const result = 11`

###### Exercises
<details>
<summary>
1. Create a multiply function
</summary>
<p>

Create a `multiply(firstNumber, secondNumber)` function that has 2 arguments
(firstNumber:number, secondNumber:number) and returns (sum:number) their sum.

You can test your function with the following code:

```js
console.log(multiply(1, 2))
```

</p>
</details>

<details>
<summary>
2. Fahrenheit to Celsius converter function
</summary>
<p>

Create a `celsiusToFahrenheit(celsiusNumber)` function that has one argument (celsiusNumber)
returns (fahrenheit:number) having the formula:

```js
℉ = ℃ * 1.8 + 32
```

You can test your function with the following code:

```js
console.log(celsiusToFahrenheit(38))
```

</p>
</details>

## Conditional statements
We make choices based on if something is truth(true) or a lie(false). In a classroom
if you have more 50% correct answers you pass the exam, otherwise you would fail it.
```js
const correctAnswerPercentage = 0.5
if (correctAnswerPercentage > 0.5) {
    console.log('You pass!')
} else {
    console.log('You fail!')
}
```

If we want to check if something is equal to something else we use `===`.
```js
const name = 'George'

if (name === 'George') {
    return 'It is cool guy George!'
} else {
    return 'Who is this guy?'
}
```

We can combine statement with `&&` - this means `and`
```js
const otherName = 'Alex'
const gender = 'female'

if (name === 'Alex' && gender === 'female') {
    return 'Hey it is Alexandra!'
} else if (name === 'Alex' && gender !== 'female'){
    return 'They call him Sandokan'
} else {
    return "It is 'it'"
}
```
###### Exercises
Run through the following [exercises][exCond]

## Loops
In life we constantly need to repeat actions, whether it is to brush our teeth every morning
or do 10 push ups at the gym. This is called a loop. In Javascript there are several types of loops.
Initially we will use the `for` loop. The `for` loop does 2 things:
1. Changes a value a certain amount of times.
2. Executes a `block` of code, the same amount of times the value changed.

Instead of writing this:
```js
console.log('Number 1')
console.log('Number 2')
console.log('Number 3')
```

We can write this:
```js
     start; end;  iteration;
for (i = 0; i < 3; i++) {
    console.log('Number ', i) // => Number 1, Number 2, Number 3
}
```

The construct starts with keyword `for`, then we have 3 parts:
1. Start of iteration `i = 0`
2. End of iteration `i < 3`
3. How to increment it `i++`(this is the same as to write `i = i + 1`).

With this, in the enclosing `block`, we get a variable `i`, which will change it's value 3 times -> 0, 1, 2

*Tip: Index in a `for` loop, does not actually point to an item, but rather it is used to
  find the corresponding item. 2 things happen: 1. `i` is changed, code inside `{}`
  is repeated as many times as `i` is changed.
###### Exercises
Run through the following [exercises][exLoop]

## Array
An array is a collection, which can hold values under a single name. Array is denoted by the
symbols `[]`

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

###### Exercises
1. Create an array with 5 values and console log each value
2. Console log the previous array in reverse order
3. Run through the following [exercises][exArr]

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

## Sneko trial
Complete the [final][final] exercise!

When finished with the trial, head over to the [padawan][padawan] section to
start creating real-world applications.

### Best practices
* Use camelCase when writing names for readibility
_bad_
```js
const somelongvariable = 5
const anotherlongvariable = 'George'
```

_good_
```js
const someLongVariable = 5
const anotherLongVariable = 'George'
```
* Write understandable names for variables, functions, etc.
_bad_
```js
const e = 5
const arXe = 'George'
```

_good_
```js
const luckyNumber = 5
const person = 'George'
```
* Use 2 spaces for indentation of code blocks
* Add spacing between operators
_bad_
```js
const function=(param1)=>{
return param1}
```

_good_
```js
const function = (param1) => {
  return param1
}
```

### Vocabulary
* Char
a single letter
* String
text, also combination of chars(letters)
* Concatenate
Means join
* Declaration
This is where you initially define a piece of code.
* Implementation
How a piece of code is implemented(written down)
* Iterate
Go through all items of a collection
* Primitives
Most basic piece of informational building block eg.: the number `1`, the text `'George'`
* Parameter
A variable which is not being defined by the function, but passed to from another piece of code
* Argument
A variable which is not being defined by the function, but passed to from another piece of code
* Block({})
This encloses definitions of variables. If we have variable `const i = 10` in one block, in another it would equal `undefined`, unless redefined
* Data structure
A set of structured data of primitives

[jsfiddle]: https://jsfiddle.net/
[exTypes]: https://github.com/mihaildono/padawan-project/blob/master/youngling/exercises/types-tasks.md
[exArr]: https://github.com/mihaildono/padawan-project/blob/master/youngling/exercises/array-tasks.md
[exCond]: https://github.com/mihaildono/padawan-project/blob/master/youngling/exercises/conditional-tasks.md
[exVar]: https://github.com/mihaildono/padawan-project/blob/master/youngling/exercises/variable-tasks.md
[exObj]: https://github.com/mihaildono/padawan-project/blob/master/youngling/exercises/object-tasks.md
[exLoop]: https://github.com/mihaildono/padawan-project/blob/master/youngling/exercises/loop-tasks.md
[final]: https://github.com/mihaildono/padawan-project/blob/master/youngling/exercises/snake-task.md
[padawan]: https://github.com/mihaildono/padawan-project/blob/master/padawan/introduction.md
[best-practices]: https://github.com/mihaildono/padawan-project/blob/master/youngling/introduction.md#best-practices
[pitfalls]: https://github.com/mihaildono/padawan-project/blob/master/youngling/introduction.md#common-pitfalls
[vocabulary]: https://github.com/mihaildono/padawan-project/blob/master/youngling/introduction.md#vocabulary
[basic-cheatsheet]: https://github.com/mihaildono/padawan-project/blob/master/youngling/basic-cheatsheet.md
