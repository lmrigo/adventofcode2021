var input = [
`199
200
208
210
200
207
240
269
260
263`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var numberStrings = input[i].split(/\s+/)
    var numbers = $.map(numberStrings, (val => {return Number(val)}))
    var increasedCount = 0
    for (var n = 1; n < numbers.length; n++) {
      if (numbers[n] - numbers[n-1] > 0) {
        increasedCount++
      }
    }

    var result = increasedCount
    // 1676
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var numberStrings = input[i].split(/\s+/)
    var numbers = $.map(numberStrings, (val => {return Number(val)}))
    var increasedCount = 0
    for (var n = 3; n < numbers.length; n++) {
      if ((numbers[n] + numbers[n-1] + numbers[n-2])
          - (numbers[n-1] + numbers[n-2] + numbers[n-3]) > 0) {
        increasedCount++
      }
    }

    var result = increasedCount
    // 1706
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
