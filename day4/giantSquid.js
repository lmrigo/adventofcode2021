var input = [
`7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var inputStrings = input[i].split(/\n+/)
    var numbers = inputStrings[0].split(',')
    var boards = []
    var b = 0
    var row = 0
    for (var j = 1; j < inputStrings.length; j++) {
      if (boards[b] === undefined) {
        boards[b] = []
      }
      boards[b][row] = inputStrings[j].trim().split(/\s+/)
      row++
      if (row >= 5) {
        row = 0
        b++
      }
    }

    var winnerBoard = -1
    var n = 0
    while (winnerBoard < 0 && n < numbers.length) {
      const drawn = numbers[n]
      $.each(boards,(bIdx,board) => {
        var found = false
        for (var bi = 0; bi < board.length; bi++) { // row
          for (var bj = 0; bj < board[bi].length; bj++) { // col
            if (board[bi][bj] === drawn) {
              board[bi][bj] = '*'
              found = true
              if (checkWinner(board, bi, bj)) {
                winnerBoard = bIdx
              }
              break
            }
          }
          if (found) break
        }
        if (winnerBoard >= 0) return false
      })
      n++
    }

    // console.log(numbers,boards)

    // last drawn number
    const lastDrawn = Number(numbers[n-1])
    //sum all unmarked numbers in the winner board
    const allUnmarkedSum = sumAllUnmarked(boards[winnerBoard])
    // console.log(winnerBoard, lastDrawn, allUnmarkedSum)

    const result = lastDrawn * allUnmarkedSum
    // console.log(result)
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var checkWinner = function(board, row, col) {
  //check row
  var starCount = 0
  for (var bj = 0; bj < board[row].length; bj++) {
    if (board[row][bj] === '*') starCount++
  }
  if (starCount === 5) return true

  //check col
  starCount = 0
  for (var bi = 0; bi < board.length; bi++) {
    if (board[bi][col] === '*') starCount++
  }
  if (starCount === 5) return true

  return false
}

var sumAllUnmarked = function(board) {
  var sum = 0
  for (var bi = 0; bi < board.length; bi++) { // row
    for (var bj = 0; bj < board[bi].length; bj++) { // col
      if (board[bi][bj] !== '*') {
        sum += Number(board[bi][bj])
      }
    }
  }
  return sum
}

var part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var inputStrings = input[i].split(/\n+/)
    var numbers = inputStrings[0].split(',')
    var boards = []
    var b = 0
    var row = 0
    for (var j = 1; j < inputStrings.length; j++) {
      if (boards[b] === undefined) {
        boards[b] = []
      }
      boards[b][row] = inputStrings[j].trim().split(/\s+/)
      row++
      if (row >= 5) {
        row = 0
        b++
      }
    }

    var remainingBoards = boards.length
    var winnerBoards = []
    var lastBoard = -1
    var n = 0
    while (remainingBoards > 0 && n < numbers.length) {
      const drawn = numbers[n]
      $.each(boards,(bIdx,board) => {
        if (winnerBoards.includes(bIdx)) return true //skip
        var found = false
        for (var bi = 0; bi < board.length; bi++) { // row
          for (var bj = 0; bj < board[bi].length; bj++) { // col
            if (board[bi][bj] === drawn) {
              board[bi][bj] = '*'
              found = true
              if (checkWinner(board, bi, bj)) {
                winnerBoards.push(bIdx)
                remainingBoards--
                if (remainingBoards === 0) {
                  lastBoard = bIdx
                }
              }
              break
            }
          }
          if (found) break
        }
      })
      n++
    }

    // console.log(numbers,boards)

    // last drawn number
    const lastDrawn = Number(numbers[n-1])
    //sum all unmarked numbers in the winner board
    const allUnmarkedSum = sumAllUnmarked(boards[lastBoard])
    // console.log(winnerBoard, lastDrawn, allUnmarkedSum)

    const result = lastDrawn * allUnmarkedSum
    // console.log(result)
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="part1"><h2>part 1</h2></div>')
  part1()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  part2()
  $('#main').append('<br>')
})
