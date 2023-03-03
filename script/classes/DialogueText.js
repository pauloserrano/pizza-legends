export default class DialogueText {
  constructor({ text, container }){
    this.text = text
    this.element = null
    this.container = container
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
  }

  init() {
    this.createElement()
    this.container.appendChild(this.element)
  }
}