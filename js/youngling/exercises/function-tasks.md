# Function exercises

## multiply

Create a `multiply(firstNumber, secondNumber)` function that has 2 arguments
(firstNumber:number, secondNumber:number) and returns (sum:number) their sum.

You can test your function with the following code:

```js
console.log(multiply(1, 2)) // => 2
```

## celsiusToFahrenheit

Create a `celsiusToFahrenheit(celsiusNumber)` function that has one argument (celsiusNumber: number) and
returns (fahrenheitNumber:number) having the formula:

```js
℉ = ℃ * 1.8 + 32
```

You can test your function with the following code:

```js
console.log(celsiusToFahrenheit(0)) // => 32
```

## fahrenheitToCelsius

Create the opposite function

```js
console.log(fahrenheitToCelsius(32)) // => 0
```

## mailify

Create a `mailify(name)` function that has one argument (name: string) and
returns (mail:string), which adds the string '@mail.com' to the end of the word.

```js
console.log(mailify('myemail.test')) // => 'myemail.test@mail.com'
```

## Advanced: Implement Classic Functional Functions

These exercises will help you understand how JavaScript's built-in array methods work under the hood. You'll implement your own versions of `map`, `filter`, and `reduce`.

### myMap

Create a `myMap(array, callback)` function that works like the built-in `Array.map()` method.

**What it should do:**

- Take an array and a callback function as arguments
- Call the callback function for each element in the array
- Return a new array with the results

**Example:**

```js
const numbers = [1, 2, 3, 4, 5]
const doubled = myMap(numbers, (num) => num * 2)
console.log(doubled) // => [2, 4, 6, 8, 10]

const names = ['luke', 'leia', 'han']
const uppercase = myMap(names, (name) => name.toUpperCase())
console.log(uppercase) // => ['LUKE', 'LEIA', 'HAN']
```

**Hint:** Create a new empty array, loop through the input array, call the callback on each element, and push the result to the new array.

### myFilter

Create a `myFilter(array, callback)` function that works like the built-in `Array.filter()` method.

**What it should do:**

- Take an array and a callback function as arguments
- Call the callback function for each element in the array
- If the callback returns `true`, include that element in the result
- Return a new array with only the elements that passed the test

**Example:**

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const evenNumbers = myFilter(numbers, (num) => num % 2 === 0)
console.log(evenNumbers) // => [2, 4, 6, 8, 10]

const jedis = [
  { name: 'Luke', rank: 'Knight' },
  { name: 'Yoda', rank: 'Master' },
  { name: 'Obi-Wan', rank: 'Master' }
]
const masters = myFilter(jedis, (jedi) => jedi.rank === 'Master')
console.log(masters) // => [{ name: 'Yoda', rank: 'Master' }, { name: 'Obi-Wan', rank: 'Master' }]
```

**Hint:** Similar to myMap, but only push to the new array if the callback returns `true`.

### myReduce

Create a `myReduce(array, callback, initialValue)` function that works like the built-in `Array.reduce()` method.

**What it should do:**

- Take an array, a callback function, and an initial value as arguments
- The callback receives two parameters: accumulator and current element
- Call the callback for each element, passing the accumulator and current element
- The callback should return the new accumulator value
- Return the final accumulator value

**Example:**

```js
const numbers = [1, 2, 3, 4, 5]
const sum = myReduce(numbers, (acc, num) => acc + num, 0)
console.log(sum) // => 15

const words = ['Hello', 'world', 'from', 'JavaScript']
const sentence = myReduce(words, (acc, word) => acc + ' ' + word, '')
console.log(sentence) // => ' Hello world from JavaScript'

const items = [
  { name: 'apple', price: 1 },
  { name: 'banana', price: 2 },
  { name: 'orange', price: 3 }
]
const total = myReduce(items, (acc, item) => acc + item.price, 0)
console.log(total) // => 6
```

**Hint:** Start with the initial value as your accumulator. Loop through the array and update the accumulator by calling the callback with the current accumulator and current element.

### Bonus Challenge: Combine Them All

Use your `myMap`, `myFilter`, and `myReduce` functions together to solve this problem:

Given an array of numbers, filter out the odd numbers, double the remaining even numbers, and sum them all up.

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// First filter even numbers
const evenNumbers = myFilter(numbers, (num) => num % 2 === 0)
// Then double them
const doubled = myMap(evenNumbers, (num) => num * 2)
// Then sum them
const sum = myReduce(doubled, (acc, num) => acc + num, 0)

console.log(sum) // => 60
// Explanation: evens are [2,4,6,8,10], doubled [4,8,12,16,20], sum = 60
```

Complete these exercises to earn the badge **"Functional Padawan"**
