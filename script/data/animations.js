const defaultAnimations = {
  idleDown: [ { x: 0, y: 0 } ],
  idleRight: [ { x: 0, y: 1 } ],
  idleUp: [ { x: 0, y: 2 } ],
  idleLeft: [ { x: 0, y: 3 } ],
  
  walkDown: [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 } ],
  walkRight: [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 } ],
  walkUp: [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 } ],
  walkLeft: [ { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 } ],
}

export {
  defaultAnimations
}