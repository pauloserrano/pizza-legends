export default class Behavior {
  constructor({ actor, map, retry, ...payload }){
    this.actor = actor || undefined
    this.map = map || undefined
    this.behavior = {
      ...payload,
      retry: retry || false
    }
  }
}