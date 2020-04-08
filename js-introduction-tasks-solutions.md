const contains = (number, arr) => {
    let result = false

    arr.forEach(element => {
    console.log(number)
    console.log(element)
    console.log(number === element)
    console.log('Number is', number)
        if (number === element) {
            result = true
        }
    })

    return result
};

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

-----------------------------

const zip = (arr1, arr2) => {
    const result = []
    for (i = 0; i < arr1.length; i++) {
        result.push([arr1[i], arr2[i]])
    }

    return result
}
