var input = [
`16,1,2,0,4,2,7,1,2,14`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    const numberStrings = input[i].split(',')
    const numbers = $.map(numberStrings, (val => {return Number(val)}))
    var min = Number.MAX_SAFE_INTEGER
    var max = -1
    $.each(numbers,(idx,val)=>{
      if (val < min) min = val
      if (val > max) max = val
    })
    // console.log(min, max)
    var minFuel = Number.MAX_SAFE_INTEGER
    for (var p = min; p < max; p++) {
      const fuel = calculateFuel(numbers,p)
      if (fuel < minFuel) minFuel = fuel
    }

    var result = minFuel
    // console.log(result)
    //345035
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var calculateFuel = function(numbers, pos) {
  return numbers.reduce((acc,val) => {
    return acc + Math.abs(val - pos)
  },0)
}

var part2 = function () {

  for (var i = 0; i < input.length; i++) {
    const numberStrings = input[i].split(',')
    const numbers = $.map(numberStrings, (val => {return Number(val)}))
    var min = Number.MAX_SAFE_INTEGER
    var max = -1
    $.each(numbers,(idx,val)=>{
      if (val < min) min = val
      if (val > max) max = val
    })
    // console.log(min, max)
    var minFuel = Number.MAX_SAFE_INTEGER
    for (var p = min; p < max; p++) {
      const fuel = calculateFuelVariable(numbers,p)
      if (fuel < minFuel) minFuel = fuel
    }

    var result = minFuel
    // console.log(result)
    //97038163
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var progression = function(n) {
  if (n <= 1) return 1
  return progression(n-1) + n
}

var calculateFuelVariable = function(numbers, pos) {
  return numbers.reduce((acc,val) => {
    return acc + progression(Math.abs(val - pos))
  },0)
}


$(function (){
  $('#main').append('<div id="part1"><h2>part 1</h2></div>')
  part1()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  part2()
  $('#main').append('<br>')
})
