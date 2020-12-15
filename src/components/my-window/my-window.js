import '../my-memory/my-memory.js'

const template = document.createElement('template')
template.innerHTML = `
<div id="mydiv">
<div id="mydivheader">click here to move<button id="close"></button></div>
<div id="content"></div>
  
</div>

<style>

  #mydiv {
    top: 20%;
    left: 40%;
    height: min-content;
    width: min-content;
    border-radius: 3px;

    /* max-height: 1000px;
    max-width: 1000px; */
    background-color: white;
    opacity: 0.9;
    z-index: 9;
    position: absolute;
    resize: both;
    overflow: auto;
  }

  #mydivheader {
    padding: 10px;
    cursor: move;
    z-index: 10;
    background-color: #413D3D;
    color: #fff;
  }

  #close {
    width:20px;
    height: 20px;
    float: right;
    background: url('./img/close.png');
    background-repeat: no-repeat;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
  }

  #content {
    margin-left: auto;
    margin-right: auto;

  padding: 20px;
  }

  </style>
`

customElements.define('my-window',
  class extends HTMLElement {
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.element = this.shadowRoot.querySelector('#mydiv')
      this.dragElement = this.dragElement.bind(this)
      this.remove = this.remove.bind(this)
      this.closeBtn = this.shadowRoot.querySelector('#close')
    }

    connectedCallback () {
      this.dragElement(this.element)
      this.closeBtn.addEventListener('click', () => {
        console.log('halllååå')
        this.remove()
      })
    }

    /**
     * Removes eventlistener.
     */
    disconnectedCallback () {
      this.closeBtn.removeEventListener('click', () => {
        console.log('halllååå')
        this.remove()
      })
    }

    remove() {
      let myWindow = this.shadowRoot.querySelector('#mydiv')
      myWindow.remove()
    }

    dragElement (elmnt) {
      // code credit --> https://www.w3schools.com/howto/howto_js_draggable.asp
      console.log(this.shadowRoot.querySelector(`#${elmnt.id}header`))
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
      if (this.shadowRoot.querySelector(`#${elmnt.id}header`)) {
        // if present, the header is where you move the DIV from:
        this.shadowRoot.querySelector(`#${elmnt.id}header`).onmousedown = dragMouseDown
      } else {
        console.log(`#${elmnt.id}header`)
      }
      function dragMouseDown(e) {
        e = e || window.event
        e.preventDefault()
        // get the mouse cursor position at startup:
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
      }
    
      function elementDrag(e) {
        e = e || window.event
        e.preventDefault()
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"
      }
    
      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null
        document.onmousemove = null
      }
    }
  })

