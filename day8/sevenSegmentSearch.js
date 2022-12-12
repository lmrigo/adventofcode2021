var input = [
`acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`,
`be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`
 ,puzzleInput
]

/**

 0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg

*/

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var inputStrings = input[i].split(/\n+/)
    var entries = []
    $.each(inputStrings, ((idx, val) => {
      var tmp = val.split(/\s+\|\s+/)
      entries.push([tmp[0].split(/\s+/), tmp[1].split(/\s+/)])
    }))
    // console.log(entries)
    var digitCount = 0
    $.each(entries,(idx,entry)=>{
      const filtered = entry[1].filter((x) => {
        return x.length === 2 // 1
          || x.length === 4 // 4
          || x.length === 3 // 7
          || x.length === 7 // 8
      });
      digitCount += filtered.length
    })

    const result = digitCount
    // 495
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var inputStrings = input[i].split(/\n+/)
    var entries = []
    $.each(inputStrings, ((idx, val) => {
      var tmp = val.split(/\s+\|\s+/)
      entries.push([tmp[0].split(/\s+/), tmp[1].split(/\s+/)])
    }))
    // console.log(entries)

    var sum = 0
    $.each(entries,(idx,entry)=>{
      var zero = []  // 6 segs
      var one = []   // 2 segs
      var two = []   // 5 segs
      var three = [] // 5 segs
      var four = []  // 4 segs
      var five = []  // 5 segs
      var six = []   // 6 segs
      var seven = [] // 3 segs
      var eight = [] // 7 segs
      var nine = []  // 6 segs
      var m235 = []  // two, three or five
      var m069 = []  // zero, six or nine
      $.each(entry[0],(idx2,val)=> {
        if (val.length == 2) {
          one = val.split('')
          one.sort()
        } else if (val.length == 3) {
          seven = val.split('')
          seven.sort()
        } else if (val.length == 4) {
          four = val.split('')
          four.sort()
        } else if (val.length == 7) {
          eight = val.split('')
          eight.sort()
        } else if(val.length == 5) {
          m235.push(val)
        } else if(val.length == 6) {
          m069.push(val)
        } else {
          console.error('errou!')
        }
      })

      // top is the difference between 1 and 7
      var top = seven.filter(x => !one.includes(x))[0]
      // middle and upleft is the difference between 1 and 4
      var middleOrUpleft = four.filter(x => !one.includes(x))
      // of 2,3 and 5 the only one that has upleft is 5
      var firstCount = 0
      var secondCount = 0
      var fiveIdx = -1
      $.each(m235, (idx3,elem) => {
        const includesFirst = elem.includes(middleOrUpleft[0])
        const includesSecond = elem.includes(middleOrUpleft[1])
        if (includesFirst && includesSecond) {
          five = elem.split('')
          five.sort()
          fiveIdx = idx3
        }
        // count how many times these appear in 235
        firstCount += includesFirst ? 1 : 0
        secondCount += includesSecond ? 1 : 0
      })
      // remove 5 from m235
      m235.splice(fiveIdx,1)
      // the only one of those that appears 3 times is middle
      // the other is up left
      var middle
      var upLeft
      if (firstCount === 3) {
        middle = middleOrUpleft[0]
        upLeft = middleOrUpleft[1]
      } else {
        middle = middleOrUpleft[1]
        upLeft = middleOrUpleft[0]
      }
      // zero is the one in 069 that doesn't have middle
      var zeroIdx = -1
      $.each(m069, (idx3,elem) => {
        if (!elem.includes(middle)) {
          zero = elem.split('')
          zero.sort()
          zeroIdx = idx3
        }
      })
      // remove 0 from m069
      m069.splice(zeroIdx,1)
      // between 2 and 3, 2 doesn't have down right
      var upRightDownRight = [...one]
      firstCount = 0
      secondCount = 0
      var threeIdx = -1
      $.each(m235, (idx3,elem) => {
        const includesFirst = elem.includes(upRightDownRight[0])
        const includesSecond = elem.includes(upRightDownRight[1])
        if (includesFirst && includesSecond) {
          three = elem.split('')
          three.sort()
          threeIdx = idx3
        }
        // count how many times these appear in 23
        firstCount += includesFirst ? 1 : 0
        secondCount += includesSecond ? 1 : 0
      })
      // remove 3 from m235
      m235.splice(threeIdx,1)
      // the remaining in m235 is 2
      two = m235[0].split('')
      two.sort()
      // if appeared in 2 and 3, it's top right
      // the other is down right
      var upRight
      var downRight
      if (firstCount === 2) {
        upRight = upRightDownRight[0]
        downRight = upRightDownRight[1]
      } else {
        upRight = upRightDownRight[1]
        downRight = upRightDownRight[0]
      }
      // on 069, the one that doesn't have upRight is 6
      var sixIdx = -1
      $.each(m069, (idx3,elem) => {
        if (!elem.includes(upRight)) {
          six = elem.split('')
          six.sort()
          sixIdx = idx3
        }
      })
      // remove 0 from m069
      m069.splice(sixIdx,1)
      // the remaining in m069 is 9
      nine = m069[0].split('')
      nine.sort()
      // down left is the difference between 8 and 9
      var downLeft = eight.filter(x => !nine.includes(x))[0]
      // bottom is the difference between 9 and 4 minus top
      var bottom = nine.filter((x) => {
        return !four.includes(x) && x !== top
      })[0]

      // printSegment(upRight,downRight,top,middle,bottom,upLeft,downLeft)

      // decode the four digits
      var fourDigits = []
      var refDigits = [
        [0,zero.join('')],
        [1,one.join('')],
        [2,two.join('')],
        [3,three.join('')],
        [4,four.join('')],
        [5,five.join('')],
        [6,six.join('')],
        [7,seven.join('')],
        [8,eight.join('')],
        [9,nine.join('')]
      ]
      $.each(entry[1],(idx2,val)=> {
        var sortedVal = val.split('')
        sortedVal.sort()
        const valStr = sortedVal.join('')
        const digit = refDigits.filter(x => x[1]===valStr)[0][0]
        fourDigits.push(digit)
      })
      // console.log(fourDigits)
      sum += Number(fourDigits.join(''))
    })


    const result = sum
    // 1055164
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var printSegment = function(ur,dr,t,m,b,ul,dl) {
  var str = '_'+t+t+t+t+'_'+'\n'
  str += ul+'____'+ur+'\n'
  str += ul+'____'+ur+'\n'
  str += '_'+m+m+m+m+'_'+'\n'
  str += dl+'____'+dr+'\n'
  str += dl+'____'+dr+'\n'
  str += '_'+b+b+b+b+'_'+'\n'
  console.log(str)
}

$(function (){
  $('#main').append('<div id="part1"><h2>part 1</h2></div>')
  part1()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  part2()
  $('#main').append('<br>')
})
