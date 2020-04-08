This is to be done with a mentor

* Install Nodejs
  https://nodejs.org/en/
  - type node in terminal to open REPL

Data structures:
 * Array: arr = [69, 31, 56, 76, 22] // TOTO Joker -> 0, 1, 2...
  - arr[0] => 69
  - arr[100] => undefined
  - arr[100] = 666
  - arr.push(<element>)

 * Object: obj = { 'Georgi': 99, 'Misho': 22 } // Roll in WoW
  - obj['Georgi'] => 99
  - obj['Pesho'] = 1
  - obj['Toni'] => undefined

Loops:
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
    const => will not change
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
    - type node in console
    - F12 in browser
    - put console.log(<variable>)
