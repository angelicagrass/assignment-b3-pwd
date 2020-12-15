import '../my-window/my-window.js'
import '../my-memory/my-memory.js'

const template = document.createElement('template')
template.innerHTML = `
<div id="pwdapp"></div>
<div id="windowcontainer"></div>
<footer>
  <button id="memory"></button>
  <button id="chat"></button>
  <button id="custom">mitt eget</button>
</footer>


<style>
  #pwdapp {
    width: 100%;
    height: 100vh;
    background-color: grey;
    background-image: url('./img/background1.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    position: relative;
    margin: 0;
    padding: 0;
  }

  footer {
    height: 70px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: black;
    opacity: 0.8;
    color: white; 
  }

  #memory, #chat {
    height: 60px;
    width: 60px;
    background-repeat: no-repeat;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
    margin-right: 10px;
  }

  #memory {
    background: url('./img/memory.png');
  }

  #chat {
    background: url('./img/chat.png');
  }

  </style>
`

customElements.define('desktop-window',
  class extends HTMLElement {
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.memoryBtn = this.shadowRoot.querySelector('#memory')
      this.chatBtn = this.shadowRoot.querySelector('#chat')
      this.customBtn = this.shadowRoot.querySelector('#custom')
      this.windowContainer = this.shadowRoot.querySelector('#windowcontainer')
    }

    connectedCallback () {
      this.memoryBtn.addEventListener('click', () => {
        console.log('memoryyyy')
        let x = document.createElement('my-window')
        let memory = document.createElement('my-memory')

        this.windowContainer.appendChild(x)
        // let y = this.shadowRoot.querySelector('my-window').shadowRoot.querySelector
        // ('#content')

        let y = x.shadowRoot.querySelector('#content')
        y.appendChild(memory)
      })
      this.chatBtn.addEventListener('click', () => {
        console.log('chaaaaaat')
        let x = document.createElement('my-window')
        this.windowContainer.appendChild(x)
      })
      this.customBtn.addEventListener('click', () => {
        console.log('custom')
        let x = document.createElement('my-window')
        this.windowContainer.appendChild(x)
      })
    }

    /**
     * Removes eventlistener.
     */
    disconnectedCallback () {

    }
  })
