var input = [
`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`
 ,puzzleInput
]

var grid
var flashCounter

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var numberStrings = input[i].split(/\s+/)
    grid = []
    flashCounter = 0
    $.each(numberStrings,(idx,val) => {
      grid.push($.map(val.split(''), (val => {return Number(val)})))
    })

    var step = 0
    const maxSteps = 100
    while (step++ < maxSteps) {
      increaseEnergyLevel(1)
      for (var y = 0; y < grid.length; y++) {
        for (var x = 0; x < grid[y].length; x++) {
          if (grid[y][x] > 9) {
            flash(y,x)
          }
        }
      }
      setFlashedToZero()
    }

    const result = flashCounter
    // 1700
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var increaseEnergyLevel = function(amount) {
  for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid[y].length; x++) {
      grid[y][x] += amount
    }
  }
}

var flash = function(y,x) {
  //flash
  grid[y][x] = Number.MIN_SAFE_INTEGER
  flashCounter++

  //increase adjacent
  if (y > 0) {
    if (x > 0) {
      grid[y-1][x-1]++
    }
    grid[y-1][x]++
    if (x < grid[y-1].length-1) {
      grid[y-1][x+1]++
    }
  }
  if (x > 0) {
    grid[y][x-1]++
  }
  //grid[y][x]++ don't increase itself
  if (x < grid[y].length-1) {
    grid[y][x+1]++
  }
  if (y < grid.length-1) {
    if (x > 0) {
      grid[y+1][x-1]++
    }
    grid[y+1][x]++
    if (x < grid[y+1].length-1) {
      grid[y+1][x+1]++
    }
  }

  //flash adjacent
  if (y > 0) {
    if (x > 0) {
      if (grid[y-1][x-1] > 9) {
        flash(y-1,x-1)
      }
    }
    if (grid[y-1][x] > 9) {
      flash(y-1,x)
    }
    if (x < grid[y-1].length-1) {
      if (grid[y-1][x+1] > 9) {
        flash(y-1,x+1)
      }
    }
  }
  if (x > 0) {
    if (grid[y][x-1] > 9) {
      flash(y,x-1)
    }
  }
  //grid[y][x] don't flash itself again
  if (x < grid[y].length-1) {
    if (grid[y][x+1] > 9) {
      flash(y,x+1)
    }
  }
  if (y < grid.length-1) {
    if (x > 0) {
      if (grid[y+1][x-1] > 9) {
        flash(y+1,x-1)
      }
    }
    if (grid[y+1][x] > 9) {
      flash(y+1,x)
    }
    if (x < grid[y+1].length-1) {
      if (grid[y+1][x+1] > 9) {
        flash(y+1,x+1)
      }
    }
  }
}

var setFlashedToZero = function() {
  for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid[y].length; x++) {
      if (grid[y][x] < 0) {
        grid[y][x] = 0
      }
    }
  }
}

var part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var numberStrings = input[i].split(/\s+/)
    grid = []
    $.each(numberStrings,(idx,val) => {
      grid.push($.map(val.split(''), (val => {return Number(val)})))
    })

    var step = 0
    const maxSteps = 100*1000
    while (step++ < maxSteps) {
      increaseEnergyLevel(1)
      for (var y = 0; y < grid.length; y++) {
        for (var x = 0; x < grid[y].length; x++) {
          if (grid[y][x] > 9) {
            flash(y,x)
          }
        }
      }
      if (allFlashed()) {
        break
      }
      setFlashedToZero()
    }

    // console.log(grid)

    const result = step <= maxSteps ? step : 'timeout'
    // 273
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var allFlashed = function() {
  var flashed = true
  for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid[y].length; x++) {
      if (grid[y][x] > 0) {
        flashed = false
        break
      }
    }
    if (!flashed) {
      break
    }
  }
  return flashed
}

$(function (){
  $('#main').append('<div id="part1"><h2>part 1</h2></div>')
  part1()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  part2()
  $('#main').append('<br>')
})
