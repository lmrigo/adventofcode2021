var input = [
`00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var numberStrings = input[i].split(/\s+/)

    var numBits = numberStrings[0].length
    var zeroCount = Array(numBits).fill(0)
    var oneCount = Array(numBits).fill(0)
    $.each(numberStrings,(idx,val)=>{
      var binary = val.split('')
      $.each(binary,(idx2,b) => {
        if (b === '1') {
          oneCount[idx2]++
        } else {
          zeroCount[idx2]++
        }
      })
    })

    var gammaRate = '' // most common
    var epsilonRate = '' // least common
    for (var b = 0; b < numBits; b++) {
      if (zeroCount[b] > oneCount[b]) {
        gammaRate+='0'
        epsilonRate+='1'
      } else {
        gammaRate+='1'
        epsilonRate+='0'
      }
    }

    var gDec = parseInt(gammaRate,2)
    var eDec = parseInt(epsilonRate,2)

    var result = gDec * eDec
    // 4006064
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var numberStrings = input[i].split(/\s+/)

    var oxygenGeneratorRating = ''
    var candidates = numberStrings
    const numBits = numberStrings[0].length
    for (var b = 0; b < numBits; b++) {
      var zeroCount = 0
      var oneCount = 0
      $.each(candidates,(idx,val)=>{
        if (val.charAt(b) === '1') {
          oneCount++
        } else {
          zeroCount++
        }
      })
      const mostFrequent = zeroCount > oneCount ? '0' : '1'
      candidates = candidates.filter((x) => {
        return x.charAt(b) === mostFrequent
      })
      if (candidates.length === 1) {
        oxygenGeneratorRating = candidates[0]
        break
      }
      oxygenGeneratorRating += mostFrequent
    }

    var CO2ScrubberRating = ''
    candidates = numberStrings
    for (var b = 0; b < numBits; b++) {
      var zeroCount = 0
      var oneCount = 0
      $.each(candidates,(idx,val)=>{
        if (val.charAt(b) === '1') {
          oneCount++
        } else {
          zeroCount++
        }
      })
      const leastFrequent = zeroCount <= oneCount ? '0' : '1'
      candidates = candidates.filter((x) => {
        return x.charAt(b) === leastFrequent
      })
      if (candidates.length === 1) {
        CO2ScrubberRating = candidates[0]
        break
      }
      CO2ScrubberRating += leastFrequent
    }

    var oDec = parseInt(oxygenGeneratorRating,2)
    var cDec = parseInt(CO2ScrubberRating,2)

    var result = oDec * cDec
    // 5941884
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
