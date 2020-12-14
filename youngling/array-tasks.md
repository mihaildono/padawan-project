# Notes
The first iteration of solving the tasks should be done by the mentor, where he
demonstarates the language. The second iteration should be done solely by the
student with hints from the mentor and additional explanation.

## Tasks

1. Draw a board in the console
  - create a file named "drawBoard.js"
  - we should be able to "execute" the file like that: `node drawBoard.js 20`. Where `20` is the size of the board

![snake-board](./draw-board.png)
<details>
<summary>
Solution
</summary>
<p>

[solutions/drawBoard.js](solutions/drawBoard.js)
</p>
</details>


## Objectives
1. Learn how to split tasks into sub-tasks
2. Start with returning what the output is

### contains
Find element in a list.
The function returns true if element is present in arr. Otherwise - false

```js
const numbers = [1, 69, 420]

const contains = (element, arr) => {}

console.log(contains(69, numbers)) // true
console.log(contains(666, numbers)) // false
```

### range
Return a list of integers, staring with from and finishing with to inclusive.

```js
const range = (from, to) => {}

console.log(range(1, 10)) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 9)) // [5, 6, 7, 8, 9]
```

### without
arr and exclude are lists. The function should return a new list, removing all elements from exclude in arr.

```js
const without = (exclude, arr) => {}

console.log(without([5,6], [1,2,3,4,5,6]); // [1, 2, 3, 4]
console.log(without([4,7], [1,2,3,4,5,6]); // [1, 2, 3, 5, 6]
```

### Zip
The function returns a new list, which merges together the values of each of the arrays with the values at the corresponding position.

```js
const zip = (arr1, arr2) => {}

console.log(zip([1, 2, 3], [4, 5, 6])) // [ [1, 4], [2, 5], [3, 6] ]
```

### [Map][map], [Filter][filter]
Implement the two functions, and reimplement the previous tasks with them.

## IMPORANT
Initially we used `for loop`, and then we learned about `map` and `filter`. From
this point on, we will strive to only you higher order functions like `map`,
`filter`, `reduce` and etc., for a more functional style approach.


[map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[filter]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

Complete this section to earn the badge "Force user"
