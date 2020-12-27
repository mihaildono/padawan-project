## Tasks

* Note: try to solve the problems both with `for loop` and `higher order functions` like `map`, `filter`, `reduce`.
* Tip: look through the javascript documentation to find helper functions to assit you in the following tasks. 

### cashRegister
Implement a function that sums the prices of all products.

```js
var cartForParty = {  
  banana: "1.25",
  handkerchief: ".99",
  Tshirt: "25.01",
  apple: "0.60",
  nalgene: "10.34",
  proteinShake: "22.36"
};

console.log(cashRegister(cartForParty))) // => 60.55
```

### pluck
Implement a function that takes an array of objects and a property (a string) and returns new array with only the selected property from all items in arr.

`const pluck = (property, arr) => {}`

For example

```js
const students = [{
  "name" : "George",
  "course" : "JavaScript"
}, {
  "name" : "Elena",
  "course" : "Python"
}, {
  "name" : "Masen",
  "course" : "JavaScript"
}, {
  "name" : "Anton",
  "course" : "Java"
}, {
  "name" : "Kamen",
  "course" : "Java"
}]

console.log(pluck("name", students)) // => ["Elena", "Masen", "Anton", "Kamen", "George"]
```

### wordsHistogram
Implement a function, called wordsHistogram(str) which takes a string and returns an object, representing the histogram of the words in the given string.

A histogram is the following:
`{"word": count}`

Where count is the number of times the word is found in the given string.

There are two very important specifications for the function:

Everything must be converted to lowercase, before running the histogram
You should exclude all punctuation from the string - !?,. etc.
For example:

```js
var str = "A function is a function with a very functional function!"

console.log(wordsHistogram(str)) // => {"a" : 3, "function" : 3, "is" : 1, "with" : 1, "very" : 1, "functional" : 1}
```

### charsHistogram
Implement a function, called charsHistogram(str) which takes a string and outputs a histogram of the characters in the string.

There are two very important specifications for the function:

Everything must be converted to lowercase, before running the histogram.
Don't count white space.
You should exclude all punctuation from the string - !?,. etc.
For example:

```js
var str = "Count the characters in this very profound sentence";
console.log(charsHistogram(str));
```

Will output:
```js
{ c: 4,
  o: 3,
  u: 2,
  n: 5,
  t: 5,
  h: 3,
  e: 6,
  a: 2,
  r: 4,
  s: 3,
  i: 2,
  v: 1,
  y: 1,
  p: 1,
  f: 1,
  d: 1 }
```

### validateCreditCard
Implement a function called validateCreditCard that returns true or false, whether it is valid or not.

Here are the rules for a valid number:

Number must be 16 digits, all of them must be numbers
You must have at least two different digits represented (all of the digits cannot be the same)
The final digit must be even
The sum of all the digits must be greater than 16
The following credit card numbers are valid:

`9999777788880000`
`6666666666661666`

The following credit card numbers are invalid:

`a92332119c011112` invalid characters
`4444444444444444` only one type of number
`1111111111111110` sum less than 16
`6666666666666661` odd final number

 A valid credit card number may also contain dashes, to make a card number easier to read. For example, the following credit card numbers are now also valid:

`9999-7777-8888-0000`
`6666-6666-6666-1666`
