const contains = (number, arr) => {
  return arr.includes(number)
}

const range = () => {
  return [...new Array(10).keys()]
}

const minMax = (arr) => {
  const sortedArray = arr.sort()
  return [sortedArray[0], sortedArray[sortedArray.length - 1]]
}

const without = (exclude, arr) => {
  return arr.filter(e => !exclude.includes(e))
}

const zip = (arr1, arr2) => {
  return arr1.reduce((acc, val, i) => [...acc, [val, arr2[i]]], [])
}
