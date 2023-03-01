function convertGridToPixels(num) {
  return num * 16
}

function capitalize(str) {
  const arr = str.split(" ")
  let capitalizedStr = []

  arr.forEach(word => capitalizedStr.push(word[0].toUpperCase() + word.slice(1)))
  
  return capitalizedStr.join(" ")
}

function formatToCoordinates(x, y) {
  return `${x}, ${y}`
}

function getNextPosition(position, direction) {
  const [axis, movement] = directionMapping[direction]
  const nextPosition = { ...position }

  nextPosition[axis] += convertGridToPixels(movement)

  return nextPosition
}

const screenCenter = {
  x: convertGridToPixels(10.5),
  y: convertGridToPixels(6)
}

const directionMapping = {
  up: ["y", -1],
  right: ["x", 1],
  down: ["y", 1],
  left: ["x", -1]
}

export {
  convertGridToPixels,
  formatToCoordinates,
  getNextPosition,
  directionMapping,
  screenCenter,
  capitalize,
}