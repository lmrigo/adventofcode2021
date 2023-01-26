var input = [
`[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`
 ,puzzleInput
]

const open = '([{<'
const close = ')]}>'
const match = {
  '(':')',
  '[':']',
  '{':'}',
  '<':'>'
}

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var chunkStrings = input[i].split(/\s+/)

    var corrupted = []
    $.each(chunkStrings,(idx,chunk) => {
      var stack = []
      for (var c = 0; c < chunk.length; c++) {
        var nextChar = chunk.charAt(c)
        if (open.includes(nextChar)) {
          stack.push(nextChar)
        } else {
          var pop = stack.pop()
          if (match[pop] === nextChar) {
            //all good
          } else {
            corrupted.push(nextChar)
            // console.log(chunk,pop,nextChar)
            break
          }
        }
      }

    })

    const pointsTable = {
      ')': 3,
      ']': 57,
      '}': 1197,
      '>': 25137
    }

    const points = corrupted.reduce((acc,val) => {
      return acc + pointsTable[val]
    },0)

    const result = points
    // 266301
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var chunkStrings = input[i].split(/\s+/)

    var incompleteChunksEnd = []
    $.each(chunkStrings,(idx,chunk) => {
      var stack = []
      for (var c = 0; c < chunk.length; c++) {
        var nextChar = chunk.charAt(c)
        if (open.includes(nextChar)) {
          stack.push(nextChar)
        } else {
          var pop = stack.pop()
          if (match[pop] === nextChar) {
            //all good
          } else {
            //discard
            stack = []
            break
          }
        }
      }
      if (stack.length > 0) {
        incompleteChunksEnd.push($.map(stack,x => match[x]).reverse().join(''))
      }
    })

    const pointsTable = {
      ')': 1,
      ']': 2,
      '}': 3,
      '>': 4
    }

    var points = []
    $.each(incompleteChunksEnd,(idx,compl) => {
      var score = 0
      for (var c = 0; c < compl.length; c++) {
        score *= 5
        score += pointsTable[compl.charAt(c)]
      }
      points.push(score)
    })
    // console.log(incompleteChunksEnd,points)
    points.sort((a,b) => {
      return a-b
    })

    const result = points[~~(points.length / 2)]
    // 3404870164
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
