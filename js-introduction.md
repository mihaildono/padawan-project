This is to be done with a mentor

* Install Nodejs
  https://nodejs.org/en/
  - create <filename>.js
  - type node in terminal to open REPL
  - run file by typing in terminal `node <filename>.js`
  - file contents example:
    * line 1: function example(param) {} // declare function
    * line 2: example() // invoke function


Data structures:
 * Array: arr = [69, 31, 56, 76, 22] // TOTO Joker -> 0, 1, 2...
  - arr[0] => 69
  - arr[100] => undefined
  - arr[100] = 666
  - arr.push(<element>) // add to last index

 * Object(Hash, Dictionary): obj = { 'Georgi': 99, 'Misho': 22 } // Roll in WoW
  - obj['Georgi'] => 99
  - obj['Pesho'] = 1
  - obj['Toni'] => undefined
  obj.keys => ['Georgi', 'Pesho']
  obj.values => ['99', '1']

Loops:
    - Think in collection mutation rather than individual elements(that's why
    for loop is not as used as much as map/filter... etc. )

    // for object we can use obj.keys/obj.values
    for (i = 0; i < 5; i++) {
      arr[i]                    // arr[0] => 69, arr[1] => 31 ...
    }

    arr.forEach(element => `hey ${element}`) => hey 69, hey 31 ... // element is the same as arr[i]

Functions:
    function <name>(<params>) {}
    function add(a, b) {
      console.log(a+b)
    }
    > add(5, 6) => 11


    * arrow function =>
    const add = (a, b) => {}

    const pp = a => { console.log('hey', a) }

    arr.forEach(pp) => hey 69, hey 31 ...

Declarations:
    const => will not change variable
    let => will change(mutable)

Conditional Statements:
    If/else

    let georgi = 'pichaga'

    if (georgi === 'pichaga') { // dont use two ==; use === for comparison
        console.log('yey')
    } else {
        console.log('nay')
    }

Debugging:
    - type debugger in console
    - F12 in browser
    - put console.log()
