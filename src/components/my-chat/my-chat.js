import { EmojiButton } from '@joeattardi/emoji-button'

const template = document.createElement('template')
template.innerHTML = `

<div id="size"> 
  <ul id="chat" class="slidedark"></ul>
    <form id ="colorchange">
      <div id="chatten">
        <textarea rows="8" cols="40" id="message" class="slidedark" data-emoji-picker="true"></textarea>
        <br />
      <button id="send" type="submit">SEND</button>
  <div id="messageUser"></div>
  </div>
    <div id="username">
      <p>Enter your username to start the chat</p>
        <label for="username">Username: </label>
          <input type="text" id="usernamefield" name="usernamefield"><br>
        <input id="namebtn" type="submit" value="Submit">
    </div>
  <div id="switchemoji">
    <label class="switch">
      <input type="checkbox" id="mycheck">
      <span class="slider round"></span>
    </label>
    <button class="trigger">🙂</button> 
  </div>
</div>

<style>

  textarea {
  resize: none;
  border: 1px solid lightgrey;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
    
  #switchemoji {
    display: inline-block;
    position: relative;
  }

.trigger {
  height: 34px;
  border-radius: 3px;
  border: none;
  position: absolute;
  bottom: 0;
  background-color: #ededed;
}

.darkmode {
  background-color: #413D3D;
}

#message.darkmode {
  color: #A9CBA6;
  font-weight: 500;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-top: 5px;
  margin-right:5px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #7EBEA3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #7EBEA3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/* end of slide */

#send {
  float: right;
  margin-top: 5px;
  margin-right: 5px;
}

  .hide {
    display: none;
  }

  #size {
    width: 398px;
    height: 643px;
  }
  #chat {
    width: 399px;

    list-style-type: none;
  }

  form {
    position: absolute;
    bottom: 10px;
    width: 400px;
  }

  ul {
    max-height: 650px;
    display: block;
    width: 396px;
    padding: 0;
    list-style-type: none;
    position: absolute;
    bottom: 170px;
    top: 40px;
    overflow: scroll;
    -webkit-transform: rotate(180deg);
  }

  li {
    float: right;
    clear: both; 
    display: block;
    border-radius: 6px 0 6px 0;
    background: #7EBEA3;
    /* border: 2px solid #7EBEA3; */
    border-radius: 5px;
    box-shadow: 0 0 6px #B2B2B2;
    margin: 5px;
    padding: 10px 18px;
    word-break: break-all; 
    -webkit-transform: rotate(180deg);
  }

  #me {
    float: left;
    clear: both;
    background: #A9CBA6;
    display: block;
    word-break: break-all;
    -webkit-transform: rotate(180deg);
  }

  #send {
    color: white;
    font-size: 12px;
    font-weight: 700;
    background: #7EBEA3;
    border: none;
    border-bottom: 4px solid #53A08E;
    width: 80px;
    height: 34px;
    border-radius: 3px;
  }

</style>
`

customElements.define('my-chat',
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

      this.wsConnect = this.wsConnect.bind(this)
      this.chatMessage = this.chatMessage.bind(this)
      this.saveToLocalStorage = this.saveToLocalStorage.bind(this)
      this.chatStart = this.chatStart.bind(this)
      this.darkModeToggle = this.darkModeToggle.bind(this)
      this.setUserName = this.setUserName.bind(this)
      this.emojiPicker = this.emojiPicker.bind(this)

      this.nameBtn = this.shadowRoot.querySelector('#namebtn')
      this.inputName = this.shadowRoot.querySelector('#usernamefield')

      this.chatcontainer = this.shadowRoot.querySelector('#chatten')
      this.slide = this.shadowRoot.querySelector('#mycheck')
      this.allArea = this.shadowRoot.querySelectorAll('.slidedark')
      this.picker = new EmojiButton()
      this.message =
      this.userName = ''
    }

    /**
     * Called when the custom element is inserted in the DOM.
     */
    connectedCallback () {
      this.emojiPicker()
      this.chatStart()
      this.slide.addEventListener('click', () => {
        this.darkModeToggle()
      })
      this.nameBtn.addEventListener('click', (event) => {
        event.preventDefault()
        this.setUserName()
      })
    }

    /**
     * Removes eventlistener.
     */
    disconnectedCallback () {
      this.chatStart()
      this.slide.removeEventListener('click', () => {
        this.darkModeToggle()
      })
      this.nameBtn.removeEventListener('click', (event) => {
        event.preventDefault()
        this.setUserName()
      })
    }

    /**
     * Sets the username to this.userName.
     *
     */
    setUserName () {
      this.userName = this.inputName.value
      this.chatcontainer.classList.remove('hide')
      this.shadowRoot.querySelector('#username').style.display = 'none'
      this.saveToLocalStorage()
      this.wsConnect()
    }

    /**
     * Emoji picker in chat.
     *
     */
    emojiPicker () {
      // emojipicker: https://emoji-button.js.org/ installed with npm.
      const trigger = this.shadowRoot.querySelector('.trigger')
      const textField = this.shadowRoot.querySelector('#message')

      this.picker.on('emoji', selection => {
        trigger.innerHTML = selection.emoji
        textField.value += selection.emoji
        console.log(selection.emoji)
      })

      trigger.addEventListener('click', (event) => {
        event.preventDefault()
        this.picker.togglePicker(trigger)
      })
    }

    /**
     * Darkmode toggle.
     *
     */
    darkModeToggle () {
      const emojiBtn = this.shadowRoot.querySelector('.trigger')

      if (this.slide.checked === true) {
        this.picker.setTheme('dark')
        emojiBtn.style.backgroundColor = '#413D3D'
        this.allArea.forEach(element => {
          element.classList.add('darkmode')
        })
        const x = this.parentNode.parentNode
        x.style.backgroundColor = '#2c2a2a'
      }
      if (this.slide.checked !== true) {
        emojiBtn.style.backgroundColor = '#ededed'
        this.picker.setTheme('light')
        this.allArea.forEach(element => {
          element.classList.remove('darkmode')
        })
        const x = this.parentNode.parentNode
        x.style.backgroundColor = 'white'
      }
    }

    /**
     * Sets the username to this.userName.
     *
     */
    chatStart () {
      let existing = localStorage.getItem('usernames')

      if (existing) { // If username exists
        existing = JSON.parse(existing)
        this.userName = existing.username
        this.chatcontainer.classList.remove('hide')
        this.shadowRoot.querySelector('#username').style.display = 'none' // Hide username choice
        this.wsConnect()
      } else {
        this.chatcontainer.classList.add('hide')
      }
    }

    /**
     * Saves username to local storage.
     *
     */
    saveToLocalStorage () {
      const nameObj = {
        username: this.userName
      }
      window.localStorage.setItem('usernames', JSON.stringify(nameObj))
    }

    /**
     * Connects chat to server.
     *
     */
    wsConnect () {
      const ws = new WebSocket('wss://cscloud6-127.lnu.se/socket/')
      ws.addEventListener('open', () => {
        console.log('WE ARE CONNECTED')
      })

      ws.addEventListener('close', () => {
        console.log('WE ARE NOT CONNECTED')
      })

      ws.addEventListener('message', ({ data }) => {
        console.log(data)
        const li = document.createElement('li')
        const JSONObject = JSON.parse(data)
        const theText = JSONObject.data
        const theName = JSONObject.username
        if (theName === `${this.userName}`) {
          li.setAttribute('id', 'me')
        }
        li.innerText = `${theName}: ${theText}`
        const el = this.shadowRoot.querySelector('#chat')
        el.insertBefore(li, el.firstChild)
      })

      this.shadowRoot.querySelector('form').addEventListener('submit', event => {
        event.preventDefault()
        const myMessage = this.shadowRoot.querySelector('#message').value
        this.chatMessage(myMessage)
        ws.send(this.message)
        this.shadowRoot.querySelector('#message').value = ''
      })
    }

    /**
     * Chatmessage.
     *
     * @param {string} myMessage - The chat message.
     */
    chatMessage (myMessage) {
      const myObjectToSend = {
        type: 'message',
        data: `${myMessage}`,
        username: `${this.userName}`,
        channel: 'my, not so secret, channel',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }
      const json = JSON.stringify(myObjectToSend)
      this.message = json
    }
  })
