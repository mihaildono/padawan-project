## Conditional statements exercises

### max
Create a `max(a, b)` function that has 2 arguments (a:number, b:number) and returns (number).
Return the bigger number of the two.

```js
console.log(max(5, 6)) // => 6
console.log(max(0, -5)) // => 0
```

### isLegal
Create a `isLegal(num, country)` function that has 2 arguments (num:number, country:string)
and returns (boolean), which checks if an age is eligible to drink in EU/US
* EU drinking age is 18
* US drinking age is 21
```js
console.log(isLegal(17, EU)) // => 'illeagal'
console.log(isLegal(18, EU)) // => 'legal'
console.log(isLegal(18, US)) // => 'illegal'
console.log(isLegal(21, US)) // => 'legal'
```
### isEven
Create a `isEven(num)` function that has 1 argument (num:number) and returns (boolean),
which checks if a number is even.

You can test your function with the following code:
```js
console.log(isEven(73)) // => false
console.log(isEven(0)) // => true
console.log(isEven(16)) // => true
```
### startEndF
Create a `starEndF(text)` function that has 1 argument (text:string) that returns (boolean),
which checks if a word begins and ends with the letter `F`.

You can test your function with the following code:
```js
console.log(startEndF('FarF')) // => true
console.log(startEndF('Foo')) // => false
console.log(startEndF(' FooF')) // => false
```

### calculator
Create a `calculator(leftOperand, rightOperand, sign)` function that has 3 arguments (leftOperand: number, rightOperand: number, sign:string),
that calculates the `leftOperand` and `rightOperand` based on the `sign`.
You can test your function with the following code:

```js
console.log(calculator(5, 6, '+')) // => 11
console.log(calculator(30, 5, '/')) // => 6
console.log(calculator(5, 6, '*')) // => 30
console.log(calculator(5, 6, '-')) // => -1
```
