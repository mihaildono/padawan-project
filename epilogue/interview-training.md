Interviews contrary to popular belief are not about the technical capabilities
of the interviewee, but rather how the interviewer will like him. In most jobs
in the market almost everyone will pass the technical test, which means that
candidates are filtered based on their likability by the employer. So it is very
important that the student of this program, also develop his social skills in
order to secure his place in his dream job. A popular saying in the dev
community is that a good developer write codes for people, and not just
machines. Anyone can create a working system, what is important is how this
system is being managed in time, considering all the people working on it and
the business that drives it.

## 3 step interview process
1. HR interview
   - You will get general information about the company and the role. You may or
     may not discuss salary and conditions. There may be work experience
     questions and overview of the CV.
   - Here is important just to lead a normal conversation and not give off any
     red flags. Show motivation and willingness to work.
2. Technical interview/task
   - Algorithmic task
   - Small task(eg. todo app)
   - JS language related questions
   - Computer Science related questions
     - program architecture
     - databases
     - patterns
     - testing

## CV
A good CV must not exceed 1 page, and preferably be single column.
Never use standard European format or similar, because it looks unattractive.
Use sample CV template sites like [EnchanCV][enchancv] or
[VisualCV][visualcv]. There are also example CVs there, which can serve as a
reference.

## Here are some example language specific questions
What are the differences between var, let and const?

What is closure?

What is prototype?

What is hoisting?

What are high order functions?

What is the difference between callbacks, promises and async await

What happens if you assign a variable without a keyword? `x = 1`

What will be the output and why of the two statements:

console.log(1 + +"2");
console.log("1" +  2);

## [Cheatsheet][cheatsheet]

Destructuring Assignment:

let [first, last] = ['first name', 'last name']
// or
let {first, last} = {
  first: 'first name',
  last: 'last name'
}
String methods:

"hello world".includes("world") // true
"hello world".startsWith("hello") // true
"hello world".endsWith("world") // true
parseFloat("123").toFixed(2) // "123.00"
Arrow function:

const getName = user => user.name
const funcName = name => {
  // do something
  return name
}
Array methods:

const numbers = [1, 2, 3]
numbers.map(n => n * 2) // [2, 4, 6]
numbers.filter(n => n % 2 === 0) // [2]
numbers.reduce((prev, next) => prev + next, 0) // 6
numbers.find((n) => n > 2) // 3
Array manipulation:

// Delete at index
array.splice(index, 1)

// Insert at index
array.splice(index, 0, newItem)

// find index
[1, 2, 3].indexOf(3) // 2; return -1 if not found

// concat
let array3 = array1.concat(array2) // [1].concat([2]) is [1, 2]

// new array
let array4 = [1, 2, 3, 4, 5].slice(2, 4) // [3, 4]
Spread operator: ...

const array1 = [1, 2]
const array2 = [...array1, 3, 4] // [1, 2, 3, 4]

const funcName = (x, ...params) => {
  console.log(x)
  console.log(params)
}

funcName(1, 2, 3, 4)
// 1
// [2, 3, 4]
Object spread:

const options = {
  ...defaults,
  show: true
}
Array spread

const array3 = [
  ...array1,
  ...array2,
  'newItem'
]
Iterate:

for (let i of [1, 2, 3]) {
  console.log(i)
}
// 1
// 2
// 3

for (let [index, value] of ['hi', 'hello', 'world'].entries()) {
  console.log(index, value)
}
// 0 "hi"
// 1 "hello"
// 2 "world"

const obj = {key1: 'hi', key2: 'hello', key3: 'world'};
for (let key in obj) {
  console.log(key, obj[key])
}
// or
for (let [key, value] of Object.entries(obj)) {
  console.log(key, value)
}
// key1 hi
// key2 hello
// key3 world
Create promise:

const funcName = params => {
  return new Promise((resolve, reject) => {
    // ....
    // do something
    // if success
    resolve(result)
    // if fail
    reject(error)
  })
}
funcName('test')
  .then(result => {
    // ...
  })
  .catch(error => {
    // ...
  })
  .finally(() => {
    // ...
  })
All promise:

let promises = []
// func1 and func2 returns a promise
promises.push(func1())
promises.push(func2())

Promise.all(promises).then(allResult => {
  let [result1, resul2] = allResult
  // ...
})
Async-await:

const funcName = async () => {
  const data = await fetchData()
  return data
}

funcName()
  .then(result => {
    // ...
  })
  .catch(error => {
    // ...
  })
  .finally(() => {
    // ...
  })
Generator:

function * countdown(n) {
  for (let i = n; i > 0; --i) {
    yield i
  }
}
[...countdown(3)] // [ 3, 2, 1 ]

//
let gen = countdown(3)
gen.next() // 3
gen.next() // 2
Browser:

encodeURIComponent() // Encodes a URI into UTF-8
decodeURIComponent() // Decodes
window:

const formData = new window.FormData()
formData.append('file', data)

window.localStorage.getItem(key)
window.localStorage.setItem(key, data)

window.location.origin // "https://www.cyanhall.com"
window.location.hostname // "www.cyanhall.com"
window.location.href // "https://www.cyanhall.com/posts/notes/8.javascript-cheatsheet/"

window.open("https://www.cyanhall.com")

window.addEventListener('resize', resizeHandler)
window.removeEventListener('resize', resizeHandler)

// download excel file
const xhr = new window.XMLHttpRequest()
const applicationType = 'application/vnd.ms-excel; charset=UTF-8'
xhr.open('GET', url, true)
xhr.responseType = 'blob'
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
xhr.onload = function(e) {
  if (this.status === 200) {
    let blob = new window.Blob([this.response], { type: applicationType })
    let downloadUrl = window.URL.createObjectURL(blob)
    let a = document.createElement('a')
    a.href = downloadUrl
    a.download = fileName
    a.click()
  }
}
xhr.onreadystatechange = e => {
  if (xhr.readyState === 4) {
    //
  } else if (xhr.readyState === 3) {
    //
  })
}

[enchancv]: https://enhancv.com/
[visualcv]: https://www.visualcv.com/
[cheatsheet]: https://www.cyanhall.com/posts/notes/8.javascript-cheatsheet/
