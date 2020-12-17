const template = document.createElement('template')
template.innerHTML = `
<div id="size"> 

<ul id="chat"></ul>

<form>
  <div id="chatten">
  <textarea rows="8" cols="50" id="message"></textarea>
  <br />
  <button type="submit">Send</button>
  <div id="messageUser"></div>
</div>
<div id="username">
  <p>Enter your username to start the chat</p>
  <label for="username">Username: </label>
  <input type="text" id="usernamefield" name="usernamefield"><br>
  <input id="namebtn" type="submit" value="Submit">
</div>
</form>

</div>



<style>

  .hide {
    display: none;
  }

  #size {
    width: 398px;
    height: 643px;
  }
  #chat {
    list-style-type: none;
  }

  form {
    position: absolute;
    bottom: 10px;
  }

  ul {
    max-height: 650px;
    display: block;
    width: 400px;
    padding: 0;
    list-style-type: none;
    position: absolute;
    bottom: 140px;
    top: 40px;
    overflow: scroll;
  }

  li {
    float: left;
    clear: both;
    display: block;
    border-radius: 6px 0 6px 0;
    background: rgba(100, 170, 0, .1);
    border: 2px solid rgba(100, 170, 0, .1);
    border-radius: 5px;
    box-shadow: 0 0 6px #B2B2B2;
    margin: 5px;
    padding: 10px 18px;
    word-break: break-all; 

  }

  #me {
    background: #fadadd;
    display: block;
    float: right;
    clear: both;  
    word-break: break-all;
  }

</style>
`

customElements.define('my-chat',
  class extends HTMLElement {
    constructor() {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.wsConnect = this.wsConnect.bind(this)
      this.chatMessage = this.chatMessage.bind(this)
      this.saveToLocalStorage = this.saveToLocalStorage.bind(this)
      this.nameBtn = this.shadowRoot.querySelector('#namebtn')
      this.inputName = this.shadowRoot.querySelector('#usernamefield')
      this.form = this.shadowRoot.querySelector('form')
      this.chatcontainer = this.shadowRoot.querySelector('#chatten')
      this.userName = ''
      this.zindex =
      this.message
    }

    connectedCallback() {
      this.chatcontainer.classList.add('hide')

      this.form.addEventListener('click', () => {
        this.form.focus()
      })
      this.nameBtn.addEventListener('click', (event) => {
        event.preventDefault()
        // check localstorage
        this.userName = this.inputName.value
        this.chatcontainer.classList.remove('hide')
        this.shadowRoot.querySelector('#username').style.display = 'none'

        this.saveToLocalStorage()

        this.wsConnect()
      })
    }

    disconnectedCallback() {
      this.wsConnect()
      this.form.addEventListener('click', () => {
      })
    }

    saveToLocalStorage () {
      const nameObj = {
        username: this.userName
      }
      window.localStorage.setItem('usernames', JSON.stringify(nameObj))
    }

    wsConnect() {
      const ws = new WebSocket('wss://cscloud6-127.lnu.se/socket/')
      ws.addEventListener('open', () => {
        console.log('WE ARE CONNECTED')
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
        this.shadowRoot.querySelector('#chat').appendChild(li)
      })

      this.shadowRoot.querySelector('form').addEventListener('submit', event => {
        event.preventDefault()
        const myMessage = this.shadowRoot.querySelector('#message').value
        this.chatMessage(myMessage)
        ws.send(this.message)
        this.shadowRoot.querySelector('#message').value = ''
      })
    }

    chatMessage(myMessage) {
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
