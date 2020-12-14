const boardSize = 20
const BORDER_CHAR = '🐍'
const EMPTY_CHAR = '  '

// Each line is a sequence of characters
const createLine = (size, isBorderLine) => {
  let line = ''
  for (let i = 0; i < size; i++) {
    if (isBorderLine) {
      line = line + BORDER_CHAR
    } else if (i == 0 || i == size - 1) {
      line = line + BORDER_CHAR
    } else {
      line = line + EMPTY_CHAR
    }
  }

  return line
}

// The board is a sequence of lines
const createLines = (size) => {
  const lines = []
  for (let i = 0; i < size; i++) {
    const isBorderLine = i == 0 || i == size - 1
    lines.push(createLine(size, isBorderLine))
  }
  return lines
}

const drawBoard = (size) => {
  createLines(size).forEach((line) => console.log(line))
}

drawBoard(boardSize)
