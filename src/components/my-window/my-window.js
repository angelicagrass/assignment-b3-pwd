
/**
 * The my-window web component module.
 *
 * @author Angelica Grass <ag223vg@student.lnu.se>
 * @version 1.0.0
 */

import '../my-memory/my-memory.js'

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
<div id="mydiv">
  <div id="mydivheader">Window<button id="close"></button></div>
  <div id="content" tabindex="-1"></div>
</div>

<style>

  #mydiv {
    top: 5%;
    left: 5%;
    height: min-content;
    width: min-content;
    border-radius: 5px;
    border: solid 1px #e2e2e2;
    background-color: white;
    z-index: 100;
    position: absolute;
    overflow: scroll;
  }

  #mydivheader {
    padding: 10px;
    cursor: move;
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
    overflow: auto;
    padding: 20px;
  }

  </style>
`
customElements.define('my-window',
/**
 * Define custom element.
 */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.element = this.shadowRoot.querySelector('#mydiv')
      this.dragElement = this.dragElement.bind(this)
      this.removeWindow = this.removeWindow.bind(this)
      this.closeBtn = this.shadowRoot.querySelector('#close')
    }

    /**
     * Called when the custom element is inserted in the DOM.
     */
    connectedCallback () {
      this.dragElement(this.element)
      this.closeBtn.addEventListener('click', (event) => {
        event.preventDefault()
        this.removeWindow(event)
      })
    }

    /**
     * Removes eventlistener.
     */
    disconnectedCallback () {
      this.dragElement(this.element)
      this.closeBtn.removeEventListener('click', () => {
        this.remove()
      })
    }

    /**
     * Removes the window.
     */
    removeWindow () {
      const myWindow = this.shadowRoot.querySelector('#mydiv')
      const test = myWindow.getRootNode().host
      test.remove()
    }

    /**
     * Moves the element on mousedown.
     *
     * @param {string} elmnt the element to move.
     */
    dragElement (elmnt) {
      // code credit --> https://www.w3schools.com/howto/howto_js_draggable.asp
      console.log(this.shadowRoot.querySelector(`#${elmnt.id}header`))
      let pos1 = 0
      let pos2 = 0
      let pos3 = 0
      let pos4 = 0
      if (this.shadowRoot.querySelector(`#${elmnt.id}header`)) {
        // if present, the header is where you move the DIV from:
        this.shadowRoot.querySelector(`#${elmnt.id}header`).onmousedown = dragMouseDown
      } else {
        console.log(`#${elmnt.id}header`)
      }

      /**
       * Moves the element on mousedown.
       *
       * @param {string} windowDiv the element to move.
       */
      function dragMouseDown (windowDiv) {
        windowDiv = windowDiv || window.event
        windowDiv.preventDefault()
        // get the mouse cursor position at startup:
        pos3 = windowDiv.clientX
        pos4 = windowDiv.clientY
        document.onmouseup = closeDragElement
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
      }
      /**
       * Moves the element on mousedown.
       *
       * @param {*} windowDiv - the element to move.
       */
      function elementDrag (windowDiv) {
        windowDiv = windowDiv || window.event
        windowDiv.preventDefault()
        // calculate the new cursor position:
        pos1 = pos3 - windowDiv.clientX
        pos2 = pos4 - windowDiv.clientY
        pos3 = windowDiv.clientX
        pos4 = windowDiv.clientY
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + 'px'
        elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'
      }
      /**
       * Moves the element on mousedown.
       *
       */
      function closeDragElement () {
        // stop moving when mouse button is released:
        document.onmouseup = null
        document.onmousemove = null
      }
    }
  })
