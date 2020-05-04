const contains = (number, arr) => {
    let result = false

    arr.forEach(element => {
        if (number === element) {
            result = true
        }
    })

    return result
};

const contains = function (element, arr) {
    return arr.includes(element)
}

contains(1, [1, 2, 3, 4]) => true
contains(1, [2, 3, 4]) => false

-----------------------------

const range = (from, to) => {
    const result = [] // output is array
    for (i = from; i <= to; i++) {
      result.push(i)
    }

    return result
};

var range = function (from, to) {
    return Array.from({ length: to - from + 1 }, (_, i) => i + 1)
}

-----------------------------

const without = (exclude, arr) => {
    const result = []
    let isExcluded = false
    arr.forEach(element => {
        isExcluded = false
         exclude.forEach(excluded => {
            if (excluded === element) {
                isExcluded = true
           }
        })
        if (!isExcluded) {
            result.push(element)
        }
    })
    return result
}

var without = function (exclude, arr) {
    return arr.filter(x => !exclude.includes(x))
}

-----------------------------

const zip = (arr1, arr2) => {
    const result = []
    for (i = 0; i < arr1.length; i++) {
        result.push([arr1[i], arr2[i]])
    }

    return result
}

var zip = (...args) => args[0].map((_, index) => args.map(arr => arr[index]))
