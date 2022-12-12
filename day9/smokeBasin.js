var input = [
`2199943210
3987894921
9856789892
8767896789
9899965678`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var rowStrings = input[i].split(/\n+/)
    var grid = []
    for (var y = 0; y < rowStrings.length; y++) {
      grid[y] = $.map(rowStrings[y].split(''), (val => {return Number(val)}))
    }
    var riskLevel = 0
    for (var y = 0; y < grid.length; y++) {
      for (var x = 0; x < grid[y].length; x++) {
        var top = (y > 0) ? (grid[y-1][x] > grid[y][x] ): true
        var bottom = (y < grid.length-1) ? (grid[y+1][x] > grid[y][x]) : true
        var left = (x > 0) ? (grid[y][x-1] > grid[y][x]) : true
        var right = (x < grid[y].length-1) ? (grid[y][x+1] > grid[y][x]) : true
        if (top && bottom && left && right) {
          riskLevel += (1 + grid[y][x])
        }
      }
    }

    // console.log(grid)

    const result = riskLevel
    // 603
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var rowStrings = input[i].split(/\n+/)
    var grid = []
    for (var y = 0; y < rowStrings.length; y++) {
      grid[y] = $.map(rowStrings[y].split(''), (val => {return Number(val)}))
    }
    var lowPoints = []
    for (var y = 0; y < grid.length; y++) {
      for (var x = 0; x < grid[y].length; x++) {
        const top = (y > 0) ? (grid[y-1][x] > grid[y][x] ): true
        const bottom = (y < grid.length-1) ? (grid[y+1][x] > grid[y][x]) : true
        const left = (x > 0) ? (grid[y][x-1] > grid[y][x]) : true
        const right = (x < grid[y].length-1) ? (grid[y][x+1] > grid[y][x]) : true
        if (top && bottom && left && right) {
          lowPoints.push({x:x,y:y})
        }
      }
    }

    var basinSizes = []
    $.each(lowPoints,(idx,lowPoint) => {
      // find basin
      var basin = ''
      var nextPoints = [lowPoint]
      while (nextPoints.length > 0) {
        const pt = nextPoints.shift()
        if (basin.includes(pt.x+','+pt.y)) {
          continue
        }
        basin += '|'+pt.x+','+pt.y
        const top = pt.y > 0 && grid[pt.y-1][pt.x] < 9
        if (top) {
          if (!basin.includes(pt.x+','+(pt.y-1))) {
            nextPoints.push({x:pt.x, y:(pt.y-1)})
          }
        }
        const bottom = pt.y < grid.length-1 && grid[pt.y+1][pt.x] < 9
        if (bottom) {
          if (!basin.includes(pt.x+','+(pt.y+1))) {
            nextPoints.push({x:pt.x, y:(pt.y+1)})
          }
        }
        const left = pt.x > 0 && grid[pt.y][pt.x-1] < 9
        if (left) {
          if (!basin.includes((pt.x-1)+','+pt.y)) {
            nextPoints.push({x:(pt.x-1), y:pt.y})
          }
        }
        const right = pt.x < grid[pt.y].length-1 && grid[pt.y][pt.x+1] < 9
        if (right) {
          if (!basin.includes((pt.x+1)+','+pt.y)) {
            nextPoints.push({x:(pt.x+1), y:pt.y})
          }
        }
      }
      const count = (basin.match(/,/g) || []).length;
      basinSizes.push(count)
      // console.log(basin,count)
    })
    basinSizes.sort((a,b)=>{return b-a})

    const result = basinSizes[0] * basinSizes[1] * basinSizes[2]
    // 786780
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
