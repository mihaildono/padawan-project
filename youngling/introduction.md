# Introduction
> "Truly wonderful, the mind of a child is." <br/>
> ―Yoda

The computer thinks in a logical way. Humans do not. The biggest challenges for
a developer who is just starting out is learning basic algorithmic thinking and
the related vocabulary.
The introduction part of JavaScript is split into two parts - arrays and objects, as
those are the basic data structures of the language. There will be sample
explanations, but mentors are encouraged to give their own.

*Using internet for help is not advised in this section

###### First Homework
Before going into the first lesson, check the first [homework][homework01].

# Prerequisites
* Make an account for [jsfiddle][jsfiddle]
  This is an website that makes it super easy to run JavaScript code.


## The basics

 - We program using a language called **JavaScript**. What do you think is a programming language?
 - We use [jsfiddle] to run JavaScript code. It's a website that let's you write JavaScript code and play with it.
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


## Numbers & Strings
In *JavaScript* and in programming in general, the most simple piece of information is expressed
via primitive data types. They are **String** and **Number**. Let's see some examples:

### Numbers

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

### Strings
Strings are combinations of letters(chars), therefore it's just a text.

```
console.log("I'm a string")
```
`"I'm a string"` is a string

We can also concatenate(join) strings: `"baby " + "Yoda"`:

## Variables
Variables are containers for storing data values.

You can do the following things with a variable:
 1. Creating it - it's called "variable declaration"

```js
let newVariable
```

 2. Passing it a value - it's called "value assignment". To `assign` a value to a `variable` use '='
```js
let newVariable
newVariable = 44
```

3. Creating **and** passing a value
```js
let newVariable = 44
```

Variables can be defined via the keywords `let` and `const`. The difference is that `const` is immutable, which means it can't be changed.

You can try but the computer will return an error:
```js
const newPizza = 'yummy'
newPizza = 'cold as hell' // !!! ERROR: Uncaught TypeError: Assignment to constant variable
```

###### Analogy
You can think for the variables as for "named boxes". You can put things inside the box and you can refer to them with the name of the box. When you use **const** you cannot change what's inside the box.

 - The box has to **have a name**, because you want to distinguish it from the other boxes.
 - The box can be empty, but if you don't fill it with somthing it isn't very useful.

###### Exercises

<details>
  <summary>
  1. Print the value of the variable

  Create a variable with name `granny` assign it a value some text. Print the value on the console.
  </summary>
  <p>

```js
const granny = "I'm not so old, m*fckaa"

console.log(granny)
```
  </p>
</details>


## Functions
Functions are a collection of code that we want to reuse.
There are two ways to define a function:

1. `const <funcName> = (<param1>, <param2>) => { return <result> }`
2. `function <funcName>(<params...>) {}`

*NOTE:* We use the syntax `<>` for illustrating what name means and `<>` is not part of the JavaScript language**.

Throughout the project the student will use the first way.
This is a sample function which sums two numbers:
```js
const add = (a, b) => {
    return a + b
}

const result = add(5, 6) // 11
console.log(result)
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
1. Make a multiply function
</summary>
<p>

Create a `multiply` function that sums any two parameters that you pass to it.

You can test your function with the following code:

```
console.log(multiply(1, 2))
```

</p>
</details>

<details>
<summary>
2. Fahrenheit to Celsius converter function
</summary>
<p>

Create a `celsiusToFahrenheit` function that converters Fahrenheit into Celsius, having the formula:

```
℉ = ℃ * 1.8 + 32
```

You can test your function with the following code:

```
console.log(celsiusToFahrenheit(38))
```

</p>
</details>

## Conditional Statements
Sometimes we want to split the flow of our application depending on the result of an expression. We do this with the keywords `if` and `else`.

**NOTE** Introduce booleans and logical operators here
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
**NOTE** Go to mozilla docs and look at how to get the first character of a string
2. Check if word begins with 'F'

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
* Char
a single letter
* String
text, also combination of chars(letters)
* Concatenate
Means join
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

[jsfiddle]: https://jsfiddle.net/
[exArr]: https://github.com/mihaildono/padawan-project/blob/master/youngling/array-tasks.md
[exObj]: https://github.com/mihaildono/padawan-project/blob/master/youngling/object-tasks.md
[final]: https://github.com/mihaildono/padawan-project/blob/master/youngling/snake-task.md
[padawan]: https://github.com/mihaildono/padawan-project/blob/master/padawan/introduction.md
[homework01]: https://github.com/mihaildono/padawan-project/blob/master/youngling/homework/homework-console.md
