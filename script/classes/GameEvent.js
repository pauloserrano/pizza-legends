export default class GameEvent {
  constructor({ actor, behavior, map }){
    this.behavior = behavior
    this.actor = actor
    this.map = map
  }

  stand(resolve) {
    this.actor.startBehavior({ 
      behavior: this.behavior, 
      map: this.map 
    })

    const eventHandler = ({ detail }) => {
      if (detail.actor === this.actor){
        document.removeEventListener("hasFinishedStanding", eventHandler)
        resolve()
      }
    }

    document.addEventListener("hasFinishedStanding", eventHandler)
  }

  walk(resolve) {
    this.actor.startBehavior({ 
      behavior: { ...this.behavior, retry: true }, 
      map: this.map,
    })

    const eventHandler = ({ detail }) => {
      if (detail.actor === this.actor){
        document.removeEventListener("hasFinishedMoving", eventHandler)
        resolve()
      }
    }

    document.addEventListener("hasFinishedMoving", eventHandler)
  }

  run() {
    return new Promise(resolve => {
      this[this.behavior.type](resolve)
    })
  }
}