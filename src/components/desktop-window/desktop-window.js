import '../my-window/my-window.js'
import '../my-memory/my-memory.js'
import '../my-clock/my-clock.js'

const template = document.createElement('template')
template.innerHTML = `
<div id="pwdapp"></div>
<div id="windowcontainer"></div>
<footer>
  <button class="iconbtn" id="memory"></button>
  <button class="iconbtn" id="chat"></button>
  <button class="iconbtn" id="custom"></button>
  <my-clock></my-clock>
</footer>


<style>

  #pwdapp {
    width: 100%;
    height: 100vh;
    background-color: grey;
    background-image: url('./img/smokebackground.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    position: relative;
    z-index: 1;
    margin: 0;
    padding: 0;
  }

  /* test */



  .iconbtn {
    transition: all .2s ease-in-out;
    }

  .iconbtn:hover {
    /* transform: scale(1.1); */
    transform: translateY(-5px);
    }

  footer {
    height: 70px;
    position: fixed;
    z-index: 2;
    left: 0;
    bottom: 0;
    padding-bottom: 4px;
    right: 20%;
    left: 20%;
    width: 60%;
    background: rgba(0,0,0,0.5);
    border-radius: 10px 10px 0 0;
    /* opacity: 0.8; */
    color: white; 
  }

  #memory, #chat, #custom {
    height: 60px;
    width: 60px;
    background-repeat: no-repeat;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
    margin-right: 10px;

  }

  #memory {
    background: url('./img/game-icon.png');
    background-repeat: no-repeat;
    margin: 12px 10px 0 20px;

  }

  #chat {
    background: url('./img/chat-icon.png');
    background-repeat: no-repeat;


  }

  #custom {
    background: url('./img/quote-icon.png');
    background-repeat: no-repeat;
    
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
      this.idCounter = 0
    }

    connectedCallback () {
      this.memoryBtn.addEventListener('click', () => {
        this.idCounter++
        let x = document.createElement('my-window')
        let memory = document.createElement('my-memory')
        x.id = 'memory' + this.idCounter
        // x.shadowRoot.querySelector('#mydiv').querySelector('#mydivheader').innerText = 'Memory'
        this.windowContainer.appendChild(x)
        // let y = this.shadowRoot.querySelector('my-window').shadowRoot.querySelector
        // ('#content')

        let y = x.shadowRoot.querySelector('#content')
        y.appendChild(memory)
      })
      this.chatBtn.addEventListener('click', () => {
        let x = document.createElement('my-window')
        // x.shadowRoot.querySelector('#mydiv').querySelector('#mydivheader').innerText = 'Chat'
        let chat = document.createElement('my-chat')
        this.windowContainer.appendChild(x)

        let y = x.shadowRoot.querySelector('#content')
        y.appendChild(chat)
      })
      this.customBtn.addEventListener('click', () => {
        let myApp = document.createElement('my-own')
        let x = document.createElement('my-window')
        // x.shadowRoot.querySelector('#mydiv').querySelector('#mydivheader').innerText = 'My App'
       
        this.windowContainer.appendChild(x)
        let y = x.shadowRoot.querySelector('#content')
        y.appendChild(myApp)
      })

      this.windowContainer.addEventListener('click', (event) => {
        let y = this.shadowRoot.querySelectorAll('my-window')

        // z-index fungerar ej än!

        y.forEach(element => {
          element.style.zIndex = '10'
        })
        let x = event.target
        x.style.zIndex = '100'
      })
    }

    /**
     * Removes eventlistener.
     */
    disconnectedCallback () {
      this.memoryBtn.addEventListener('click', () => {
        this.idCounter++
        let x = document.createElement('my-window')
        let memory = document.createElement('my-memory')
        x.id = 'memory' + this.idCounter
        // x.shadowRoot.querySelector('#mydiv').querySelector('#mydivheader').innerText = 'Memory'
        this.windowContainer.appendChild(x)
        // let y = this.shadowRoot.querySelector('my-window').shadowRoot.querySelector
        // ('#content')

        let y = x.shadowRoot.querySelector('#content')
        y.appendChild(memory)
      })
      this.chatBtn.addEventListener('click', () => {
        let x = document.createElement('my-window')
        // x.shadowRoot.querySelector('#mydiv').querySelector('#mydivheader').innerText = 'Chat'
        let chat = document.createElement('my-chat')
        this.windowContainer.appendChild(x)

        let y = x.shadowRoot.querySelector('#content')
        y.appendChild(chat)
      })
      this.customBtn.addEventListener('click', () => {
        let myApp = document.createElement('my-own')
        let x = document.createElement('my-window')
        // x.shadowRoot.querySelector('#mydiv').querySelector('#mydivheader').innerText = 'My App'
       
        this.windowContainer.appendChild(x)
        let y = x.shadowRoot.querySelector('#content')
        y.appendChild(myApp)
      })

      this.windowContainer.addEventListener('click', (event) => {
        let y = this.shadowRoot.querySelectorAll('my-window')

        y.forEach(element => {

          element.style.zIndex = '10'
          console.log(element)
        })
        let x = event.target

        x.style.zIndex = '100'

        console.log(event.target)
        console.log('ZINDEX HÄR ÖVER')
      })

    }
  })
