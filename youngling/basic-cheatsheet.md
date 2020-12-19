# Cheatsheet

## How to approach a problem
0. Split task into sub-tasks and implement them one-by-one
1. Start with the return
`js code`
2. Put console.log on appropriate places
3. If undefined is returned, check what you `return`
4. If a console.log or `return` is not displayed, probably the code cannot reach it.

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
     start; end;  iteration;
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
arr[0] // 69
arr[3] // 76
arr[100] // undefined
arr[100] = 666
arr[100] // 666
arr.push(7)
arr[101] // 7
```
* Keys for objects and Indexes for arrays, can be used with variables that
  evaluate to a string/number
