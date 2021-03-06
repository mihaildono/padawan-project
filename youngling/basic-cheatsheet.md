# Cheatsheet

## How to approach a problem
#### 5 steps to algorithm solving
0. Read the problem out loud and make sure you understand it.
1. See the input and output type
2. Split task into sub-tasks and to implement them one-by-one
3. Create pseudocode of the problem
4. Star coding, starting with the return statement.

#### How to debug
0. Google the error
1. Find error position by `console.log` each line until result is not as expected.
2. Put several `console.log` at different places, printing variables to see current state of code.
3. If `undefined` is returned, check what you `return`.
4. If a `console.log` or `return` is not displayed, probably the code cannot reach it.

## Types
- Number
```js
1

// use operators
(1 + 2) / 3 // => 1
```

- String
```js
// use '' to create a string
'I'm a string'

// + to join strings
`'baby ' + 'Yoda'` // => 'baby Yoda'
```

## Variables
```js
// create
let newVariable = 44 // 44

// reassign
newVariable = 3 // 3
```

## Functions
```js
// create
const add = (a, b) => {
    return a + b
}

// call
add(5, 6) // => 11

// print
console.log(result)

```

## For loop
```js
//   start; end;  iteration;
for (i = 0; i < 3; i++) {
    console.log('Number ', i) // => Number 1, Number 2, Number 3
}
```

*Tip: Index in a `for` loop, does not actually point to an item, but rather it is used to
  find the corresponding item. 2 things happen: 1. `i` is changed, code inside `{}`
  is repeated as many times as `i` is changed.

## Array
```js
const arr = [69, 31, 56, 76, 22]
// take element with index 0
arr[0] // => 69
// take element with index 3
arr[3] // => 76
// take element with index 100
arr[100] // => undefined

arr[100] = 666
arr[100] // => 666
arr.push(7)
arr[101] // => 7
```
* Keys for objects and Indexes for arrays, can be used with variables that
  evaluate to a string/number
  
## Object
```js
const person = { 'name': 'George', 'gender': 'male' }
person['gender'] // => male
person.gender // => male

person['height'] // => undefined
person['height'] = 180
person['height'] // => 180

person.keys // ['gender', 'name', 'height']
person.values // ['male', 'George', '190']
```
