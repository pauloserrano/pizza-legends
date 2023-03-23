export function convertGridToPixels(num: number) {
  return num * 16
}

export function capitalize(str: string) {
  const arr = str.split(" ")
  let capitalizedStr: string[] = []

  arr.forEach(word => capitalizedStr.push(word[0].toUpperCase() + word.slice(1)))
  
  return capitalizedStr.join(" ")
}

export function formatToCoordinates(x: number, y: number) {
  return `${x}, ${y}`
}

export function getNextPosition(position: { x: number, y: number }, direction: string) {
  const [axis, movement] = directionMapping[direction]
  const nextPosition: { [axis: string]: number } = { ...position }

  nextPosition[axis] += convertGridToPixels(movement)

  return nextPosition
}

export const screenCenter = {
  x: convertGridToPixels(10.5),
  y: convertGridToPixels(6)
}

export const directionMapping: { [direction: string]: [axis: string, movement: number] } = {
  "up": ["y", -1],
  "right": ["x", 1],
  "down": ["y", 1],
  "left": ["x", -1]
}

export const CUSTOM_EVENTS = Object.freeze({
  FINISHED_MOVING: "FinishedMoving",
  FINISHED_STANDING: "FinishedStanding",
  PLAYER_INTERACT: "PlayerInteract",
})

export function emitEvent(event: string, payload: () => any) {
  document.dispatchEvent(new CustomEvent(event, { detail: payload }))
}