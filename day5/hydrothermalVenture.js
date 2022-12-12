var input = [
`0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    const lineStrings = input[i].split(/\n+/)
    var counter = {}
    $.each(lineStrings, (idx,val) => {
      const line = $.map(val.split(/\D+/),(x => {return Number(x)}))
      const x1 = line[0]
      const y1 = line[1]
      const x2 = line[2]
      const y2 = line[3]
      if (x1 === x2 || y1 === y2) {
        const startX = x1 < x2 ? x1 : x2
        const endX = startX === x1 ? x2 : x1
        const startY = y1 < y2 ? y1 : y2
        const endY = startY === y1 ? y2 : y1
        for (var j = startX; j <= endX; j++) {
          for (var k = startY; k <= endY; k++) {
            if (counter[j+','+k] === undefined) {
              counter[j+','+k] = 0
            }
            counter[j+','+k]++
          }
        }
      }
    })

    // console.log(counter)

    var overlaps = Object.keys(counter).reduce((acc,val) => {
      return acc + (counter[val] > 1 ? 1 : 0)
    },0)

    var result = overlaps
    // 6710
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var part2 = function () {

  for (var i = 0; i < input.length; i++) {
    const lineStrings = input[i].split(/\n+/)
    var counter = {}
    $.each(lineStrings, (idx,val) => {
      const line = $.map(val.split(/\D+/),(x => {return Number(x)}))
      const x1 = line[0]
      const y1 = line[1]
      const x2 = line[2]
      const y2 = line[3]
      if (x1 < x2) { // left to right
        if (y1 < y2) { // down to up
          for (var j = x1, k = y1; j <= x2 && k <= y2; j++, k++) {
            if (counter[j+','+k] === undefined) {
              counter[j+','+k] = 0
            }
            counter[j+','+k]++
          }
        } else if (y1 > y2) { // up to down
          for (var j = x1, k = y1; j <= x2 && k >= y2; j++, k--) {
            if (counter[j+','+k] === undefined) {
              counter[j+','+k] = 0
            }
            counter[j+','+k]++
          }
        } else { // no vertical movement
          const k = y1
          for (var j = x1; j <= x2; j++) {
            if (counter[j+','+k] === undefined) {
              counter[j+','+k] = 0
            }
            counter[j+','+k]++
          }
        }
      } else if (x1 > x2) { // right to left
        if (y1 < y2) { // down to up
          for (var j = x1, k = y1; j >= x2 && k <= y2; j--, k++) {
            if (counter[j+','+k] === undefined) {
              counter[j+','+k] = 0
            }
            counter[j+','+k]++
          }
        } else if (y1 > y2) { // up to down
          for (var j = x1, k = y1; j >= x2 && k >= y2; j--, k--) {
            if (counter[j+','+k] === undefined) {
              counter[j+','+k] = 0
            }
            counter[j+','+k]++
          }
        } else { // no vertical movement
          const k = y1
          for (var j = x1; j >= x2; j--) {
            if (counter[j+','+k] === undefined) {
              counter[j+','+k] = 0
            }
            counter[j+','+k]++
          }
        }
      } else { // no horizontal movement
        const j = x1
        if (y1 < y2) { // down to up
          for (var k = y1; k <= y2; k++) {
            if (counter[j+','+k] === undefined) {
              counter[j+','+k] = 0
            }
            counter[j+','+k]++
          }
        } else if (y1 > y2) { // up to down
          for (var k = y1; k >= y2; k--) {
            if (counter[j+','+k] === undefined) {
              counter[j+','+k] = 0
            }
            counter[j+','+k]++
          }
        } else { // no vertical movement
          console.log('it exists: ',x1,y1,x2,y2)
          const j = x1
          const k = y1
          if (counter[j+','+k] === undefined) {
            counter[j+','+k] = 0
          }
          counter[j+','+k]++
        }
      }
    })

    // console.log(counter)

    var overlaps = Object.keys(counter).reduce((acc,val) => {
      return acc + (counter[val] > 1 ? 1 : 0)
    },0)

    var result = overlaps
    // 20121
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
