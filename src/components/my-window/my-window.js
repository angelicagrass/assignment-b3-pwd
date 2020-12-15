const template = document.createElement('template')
template.innerHTML = `
<div id="mydiv">
<div id="mydivheader">click here to move</div>
  <p>lorem ka</p>
</div>

<style>

  #mydiv {
    top: 20%;
    left: 40%;
    min-height: 400px;
    min-width: 400px;
    border-radius: 3px;

    /* max-height: 1000px;
    max-width: 1000px; */
    background-color: white;
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

    }

    connectedCallback () {
      this.dragElement(this.element)


    }

    /**
     * Removes eventlistener.
     */
    disconnectedCallback () {

    }

    dragElement (elmnt) {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + 'header')) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown
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

