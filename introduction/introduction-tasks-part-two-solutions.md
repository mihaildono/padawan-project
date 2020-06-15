let students = [{ "name" : "Daniel Taskoff", "course" : "Frontend JavaScript" },
{ "name" : "Elena Jeleva", "course" : "Programming 101" },
{ "name" : "Luboslava Dimitrova", "course" : "Frontend JavaScript" },
{ "name" : "Anton Antonov", "course" : "Core Java" },
{ "name" : "Nikola Dichev", "course" : "Core Java" }];

let groupBy = function(groupingFunction, arr) {
  let result = {};
  let groupData = null;
  arr.forEach(element => {
    groupData = groupingFunction(element)
    result[groupData] = arr.filter(e => Object.values(e).includes(groupData))
  })
  return result;
}

console.log(groupBy(function(student) { return student.course; }, students));

var countBy = function(countingFunction, arr) {
  let result = {};
  arr.forEach(element => {
    if(result[countingFunction(element)] === undefined) {
      result[countingFunction(element)] = 1;
    }
    else {
      result[countingFunction(element)] += 1;
    }
  })
  return result;
};

console.log(countBy(function(student) { return student.course; }, students));

let pluck = function(property, arr) {
  return arr.map( e => e[property])
};

console.log(pluck("name", students));

let wordsHistogram = function(str) {
  let finalString = str.toLowerCase();
  finalString = finalString.replace(/[^\w\s]|_/g, "")
         .replace(/\s+/g, " ");

  let wordDictionary = finalString.split(" ");
  let result = {};
  wordDictionary.forEach(e => {
    if(result[e] === undefined) {
      result[e] = 1;
    }
    else {
      result[e] += 1;
    }
  })
  return result;
}

console.log(wordsHistogram("A function is a function with a very functional function!"));

let charsHistogram = function(str) {
  //use histogram defined before
  let finalString = str.toLowerCase();
  finalString = finalString.replace(/[^\w\s]|_/g, "")
         .replace(/\s+/g, " ");

  let wordDictionary = [...finalString];
  let result = {};
  wordDictionary.forEach(e => {
    if(result[e] === undefined) {
      result[e] = 1;
    }
    else {
      result[e] += 1;
    }
  })
  return result;

}

console.log(charsHistogram("Count the characters in this very profound sentence"));

let ul = function(items) {
  result = '';

  items.forEach(e => {
     result = result + '.' + Object.values(e) + '\n';
  })
  return result;
};

let ol = function(items) {
  let result = '';
  let depth = 1;
  items.forEach( e => {
    result = result + depth + '.' + e.label + '\n';
    if(Object.keys(e).includes("children")) {
      Object.values(e.children).forEach(element => {
        result = result + (depth + 1) + '.' + Object.values(element)  + '\n';
      });
    }
  })
  return result;
};

console.log(ul([{ "label" : "Item 1"}, { "label" : "Item 2"}]))
console.log(ol([{ "label" : "Item 1"}, { "label" : "Item 2", "children" : [ { "label" : "Level 2 of Item 2" }, { "label" : "Another level 2" } ]}]))
