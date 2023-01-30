var input = [
`start-A
start-b
A-c
A-b
b-d
A-end
b-end` //pt1 10, pt 36
/*
    start
    /   \
c--A-----b--d
    \   /
     end
*/
,`dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc` //pt1 19, pt2 103
,`fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW` //pt1 226, pt2 3509
 ,puzzleInput
]

var graph

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    var nodeStrings = input[i].split(/\s+/)
    graph = {}
    var start
    $.each(nodeStrings,(idx,val) => {
      const splitted = val.split('-')
      const a = splitted[0]
      const b = splitted[1]
      if (!graph[a]) {
        graph[a] = {
          n:a,
          links:[]
        }
      }
      graph[a].links.push(b)
      if (!graph[b]) {
        graph[b] = {
          n:b,
          links:[]
        }
      }
      graph[b].links.push(a)
      if (a === 'start') {
        start = graph[a]
      }
      if (b === 'start') {
        start = graph[b]
      }
    })

    // console.log(graph)
    // console.log(start)

    var allPaths = {}
    var endPaths = {}
    var initialState = {node:'start',path:'start'}
    var nextStates = [initialState]
    var timeout = 100000
    while (timeout-- > 0 && nextStates.length > 0) {
      var st = nextStates.shift()
      if (allPaths[st.path]) {
        console.log('já passou',st.path)
      }
      allPaths[st.path] = true
      $.each(graph[st.node].links,(idx,link) => {
        const nextPath = st.path + '-' + link
        if (link === 'end') {
          allPaths[nextPath] = true
          endPaths[nextPath] = true
        } else {
          if (link === link.toLowerCase() // if it's a small cave
            && st.path.includes(link)) { // and was already visited
            return true // continue. skip
          }
          if (!allPaths[nextPath]) {
            nextStates.push({node:link,path:nextPath})
          }
        }
      })
    }
    if (timeout < 0) {
      console.log('timeout!')
    }


    const result = Object.keys(endPaths).length
    // 3713
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var nodeStrings = input[i].split(/\s+/)
    graph = {}
    var smallCaves = {}
    $.each(nodeStrings,(idx,val) => {
      const splitted = val.split('-')
      const a = splitted[0]
      const b = splitted[1]
      if (!graph[a]) {
        graph[a] = {
          n:a,
          links:[]
        }
      }
      graph[a].links.push(b)
      if (!graph[b]) {
        graph[b] = {
          n:b,
          links:[]
        }
      }
      graph[b].links.push(a)
      if (isSmallCave(a)) {
        smallCaves[a] = 0
      }
      if (isSmallCave(b)) {
        smallCaves[b] = 0
      }
    })

    // console.log(graph)
    // console.log(start)

    var allPaths = {}
    var endPaths = {}
    var initialState = {node:'start',path:'start',visitSmall:{},smallUsed:false}
    Object.assign(initialState.visitSmall,smallCaves)
    var nextStates = [initialState]
    var timeout = 1000*1000
    while (timeout-- > 0 && nextStates.length > 0) {
      var st = nextStates.shift()
      if (allPaths[st.path]) {
        console.log('já passou',st.path)
      }
      allPaths[st.path] = true
      if (isSmallCave(st.node)
        && st.path.includes(st.node)) { // and was already visited
        st.visitSmall[st.node]++
        if (st.visitSmall[st.node] > 1) {
          st.smallUsed = true
        }
      }
      $.each(graph[st.node].links,(idx,link) => {
        const nextPath = st.path + '-' + link
        if (link === 'end') {
          allPaths[nextPath] = true
          endPaths[nextPath] = true
        } else {
          if (link === 'start') { // can't visit 'start' twice
            return true // skip
          }
          if (isSmallCave(link)
            && st.path.includes(link) // and was already visited
            && st.smallUsed) { // and visitSmall was already used
            return true // skip
          }
          if (!allPaths[nextPath]) {
            var newState = {
              node:link,
              path:nextPath,
              visitSmall:{},
              smallUsed:st.smallUsed
            }
            Object.assign(newState.visitSmall,st.visitSmall)
            nextStates.push(newState)
          }
        }
      })
    }
    if (timeout < 0) {
      console.log('timeout!')
    }

    const result = Object.keys(endPaths).length
    // 91292
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var isSmallCave = function(node) {
  return node === node.toLowerCase()
      && node !== 'start'
      && node !== 'end'
}

$(function (){
  $('#main').append('<div id="part1"><h2>part 1</h2></div>')
  part1()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  part2()
  $('#main').append('<br>')
})
