Stolen from HackBulgaria

Objective:
 - Split into sub-tasks
 - Decide what is input/output

Arrays


-----------------------------
Contains. Find element in a list.
Using only higher-order functions and variables, implement contains with the following signature:

var contains = function(element, arr) {

};
The function returns true if element is present in arr. Otherwise - false

sub-tasks

1. Loop(обхождане)
2. if(element !== arr[i]) return false -> not all elements present // arr[i] === element
3. return true else

input -> number(integer), arr(array)
output -> boolean

-----------------------------

Texas Ranger!
Implement a function, called range with the following signature:

var range = function(from, to) {

};
The function returns a list of integers, staring with from and finishing with to inclusive.

For example range(1,10) would give us the [1,2,3,4,5,6,7,8,9,10] list.

sub-tasks:
1. starting point(from)
2. ending point(to)
3. loop

input -> from(integer), to(integer)
output -> array

-----------------------------

Without them!
Implement a function `without` with the following signature:

var without = function(exclude, arr) {

}
arr and exclude are lists. The function should return a new list, removing all elements from exclude in arr.

For example:

console.log(without([5,6], [1,2,3,4,5,6]); // [1,2,3,4]

sub-tasks:
1. loop through exclude
2. exclude loop inside arr
3. if element is different add to result else skip

input -> array(exclude), array(arr)
output -> arr

-----------------------------
Zip! // Use only two arrays as beginner challenge
Implement a function, called zip which takes a various number of arguments - all lists.

The function returns a new list, which merges together the values of each of the arrays with the values at the corresponding position.

Signature:

var zip = function() {
  // this is how variable arguments is passed to the function
  // there is a variable called arguments
  // that is visible in the function
  console.log(arguments);
}
Example:

console.log(zip([1, 2, 3], [4, 5, 6]));
// [ [1, 4], [2, 5], [3, 6] ]

sub-tasks:
1. take same index of both arrays
2. loop through arrays


input -> arr1(array), arr2(array)
output -> merge from arrays(array[arrays])

-----------------------------
