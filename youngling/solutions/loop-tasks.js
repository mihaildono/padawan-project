const pyramid = (size, isChristmas) => {
  let isEvenRow = false
  for(let i = 1; i < size + 1; i+=2) {
    drawLine(size, i, isEvenRow)
    isEvenRow = !isEvenRow
  }
}

const drawLine = (size, starCount, hasBall) => {
  const emptySpace = size - starCount
  let stars = '*'.repeat(starCount)
  if (hasBall) {
    stars = drawDecoration(starCount - 2)
  }

  console.log(' '.repeat(emptySpace/2) + stars + ' '.repeat(emptySpace/2))
}

const drawDecoration = (starCount) => {
  return 'O' + '*'.repeat(starCount) + 'O'
}

const customRepeat = (symbol, count) => {
  let line = ''
  for (let i = 0; i < count; i++) {
    line = line + symbol
  }

  return line
}
