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
        arr.forEach(element => {
         exclude.forEach(excluded => {
            if (excluded !== element) {
                result.push(element)
           }
        })
    })
    return result
}
