var input = [
`forward 5
down 5
forward 8
up 3
down 8
forward 2`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var commandStrings = input[i].split(/\n+/)

    var horizontal = 0
    var depth = 0
    for (var c = 0; c < commandStrings.length; c++) {
      var command = commandStrings[c].split(/\s+/)
      if (command[0] === 'forward') {
        horizontal += Number(command[1])
      } else if (command[0] === 'up') {
        depth -= Number(command[1])
      } else if (command[0] === 'down') {
        depth += Number(command[1])
      } else {
        console.error('errou!')
      }
    }

    var result = horizontal * depth
    // console.log(result)
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var commandStrings = input[i].split(/\n+/)

    var horizontal = 0
    var depth = 0
    var aim = 0
    for (var c = 0; c < commandStrings.length; c++) {
      var command = commandStrings[c].split(/\s+/)
      if (command[0] === 'forward') {
        horizontal += Number(command[1])
        depth += aim * Number(command[1])
      } else if (command[0] === 'up') {
        aim -= Number(command[1])
      } else if (command[0] === 'down') {
        aim += Number(command[1])
      } else {
        console.error('errou!')
      }
    }

    var result = horizontal * depth
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
