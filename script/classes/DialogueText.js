import { CUSTOM_EVENTS } from "../utils.js"

export default class DialogueText {
  constructor({ text, resolve }){
    this.text = text
    this.resolve = resolve
    this.element = null
  }

  createElement() {
    const dialogueContainer = document.createElement("div")
    dialogueContainer.classList.add("dialogue-container")
    
    const message = document.createElement("p")
    message.innerText = this.text

    const nextBtn = document.createElement("button")
    nextBtn.classList.add("btn-next")
    nextBtn.onclick = () => this.close()

    dialogueContainer.appendChild(message)
    dialogueContainer.appendChild(nextBtn)

    this.element = dialogueContainer
  }

  close() {
    this.element.remove()
    this.resolve()
  }

  init({ container }) {
    this.createElement()
    container.appendChild(this.element)
    document.addEventListener(CUSTOM_EVENTS.PLAYER_CONFIRM, () => this.close())
  }
}