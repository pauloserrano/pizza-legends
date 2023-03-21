export function convertGridToPixels(num) {
  return num * 16
}

export function capitalize(str) {
  const arr = str.split(" ")
  let capitalizedStr = []

  arr.forEach(word => capitalizedStr.push(word[0].toUpperCase() + word.slice(1)))
  
  return capitalizedStr.join(" ")
}

export function formatToCoordinates(x, y) {
  return `${x}, ${y}`
}

export function getNextPosition(position, direction) {
  const [axis, movement] = directionMapping[direction]
  const nextPosition = { ...position }

  nextPosition[axis] += convertGridToPixels(movement)

  return nextPosition
}

export const screenCenter = {
  x: convertGridToPixels(10.5),
  y: convertGridToPixels(6)
}

export const directionMapping = {
  up: ["y", -1],
  right: ["x", 1],
  down: ["y", 1],
  left: ["x", -1]
}

export const CUSTOM_EVENTS = Object.freeze({
  FINISHED_MOVING: "FinishedMoving",
  FINISHED_STANDING: "FinishedStanding",
  PLAYER_INTERACT: "PlayerInteract",
})

export function emitEvent(event, payload) {
  document.dispatchEvent(new CustomEvent(event, { detail: payload }))
}