export default class DialogueText {
  constructor({ text, container, resolve }){
    this.text = text
    this.element = null
    this.container = container
    this.resolve = resolve
  }

  createElement() {
    const dialogueContainer = document.createElement("div")
    dialogueContainer.classList.add("dialogue-container")
    
    const message = document.createElement("p")
    message.innerText = this.text

    const nextBtn = document.createElement("button")
    nextBtn.classList.add("btn-next")
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      this.resolve()
      this.close()
    })

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