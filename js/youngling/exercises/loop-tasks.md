# Loop exercises

## count

Create a `count` function that prints each number from 0 to 10 in ascending order

You can test your function with the following code:

```js
console.log(count()) // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## reverseCount

Create a `reverseCount` function that prints each number from 0 to 10 in descending order

You can test your function with the following code:

```js
console.log(reverseCount()) // => [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
```

## negativeCount

Create a `negativeCount` function that prints each number from 0 to (-10) in descending order

You can test your function with the following code:

```js
console.log(negativeCount()) // => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10]
```

## stepCount

Create a `stepCount` function that prints the numbers [0, 2, 4, 6, 8, 10]

You can test your function with the following code:

```js
console.log(stepCount()) // => [0, 2, 4, 6, 8, 10]
```

## customRepeat

Create a function named `customRepeat(symbol, count)` that has 2 arguments - (symbol:string, count:number) and
returns a string with the `symbol` repeated `count` times:

You can test your function with the following code:

```js
console.log(customRepeat('*', 5)) // => '*****'
```

## staircase

1. Create a function named `staircase(size)` that has 1 argument (size:number),
which is the length of the last row and prints:


```js
console.log(staircase(5))
```

```text
"*    "
"**   "
"***  "
"**** "
"*****"
```

2. Create a function named `reverseStaircase(size)` that has 1 argument (size:number),
which is the length of the last row and prints:


```js
console.log(reverseStaircase(5))
```

```text
"    *"
"   **"
"  ***"
" ****"
"*****"
```

## pyramid

Create a function `pyramid(size)` that has 1 argument (size:number),  where `size` is the height of the pyramid and prints:

- Sub tasks:
  - one task creates 1 line of the pyramid
  - one task combines all the lines of the pyramid
- Total number of symbols per row is (2 * size - 1)

7.1 Pyramid

```js
console.log(pyramid(5))
```

```text
"    *    "
"   ***   "
"  *****  "
" ******* "
"*********"
```

7.2 Reverse pyramid `reversePyramid(size)`

```js
console.log(reversePyramid(5))
```

```text
"*********"
" ******* "
"  *****  "
"   ***   "
"    *    "
```

## christmasTree

Create a function that prints a Christmas tree with an angel on top `christmasTree(size)`.

- Where `size` is the height of the tree and the height of the angel is fixed to 3 lines
- The Christmas Tree should also have Christmas balls every second row, after the first and without the last one

```js
console.log(christmasTree(5))
```

```text
"    _    "
"  {\o/}  "
"   /_\   "
"    *    "
"   o*o   "
"  *****  "
" o*****o "
"*********"
```
