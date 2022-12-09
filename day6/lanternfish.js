var input = [
`3,4,3,1,2`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var numberStrings = input[i].split(',')
    var numbers = $.map(numberStrings, (val => {return Number(val)}))
    //             0 1 2 3 4 5 6 7 8
    var counter = [0,0,0,0,0,0,0,0,0]
    $.each(numbers,(idx,val)=>{
      counter[val]++
    })
    const maxDays = 80//18
    var days = 0
    while(days++ < maxDays) {
      var newCounter = Array(9)
      for (var c = 1; c < counter.length; c++) {
        newCounter[c-1] = counter[c]
      }
      newCounter[6] += counter[0]
      newCounter[8] = counter[0]
      counter = newCounter
    }

    // console.log(counter)

    var result = counter.reduce((acc,val) => {
      return acc + val
    })
    // console.log(result)
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var numberStrings = input[i].split(',')
    var numbers = $.map(numberStrings, (val => {return Number(val)}))
    //             0 1 2 3 4 5 6 7 8
    var counter = [0,0,0,0,0,0,0,0,0]
    $.each(numbers,(idx,val)=>{
      counter[val]++
    })
    const maxDays = 256
    var days = 0
    while(days++ < maxDays) {
      var newCounter = Array(9)
      for (var c = 1; c < counter.length; c++) {
        newCounter[c-1] = counter[c]
      }
      newCounter[6] += counter[0]
      newCounter[8] = counter[0]
      counter = newCounter
    }

    // console.log(counter)

    var result = counter.reduce((acc,val) => {
      return acc + val
    })
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
