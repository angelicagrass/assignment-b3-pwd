const template = document.createElement('template')
template.innerHTML = `
<div id="size"> 
<ul id="chat"></ul>

<form>
  <textarea rows="8" cols="50" id="message"></textarea>
  <br />
  <button type="submit">Send</button>
  <div id="messageUser"></div>
</form>
</div>



<style>

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

  /* #messageUser {
  border-radius: 6px 0 6px 0;
  background: rgba(100, 170, 0, .1);
  border: 2px solid rgba(100, 170, 0, .1);
    border-radius: 5px;
    box-shadow: 0 0 6px #B2B2B2;
    display: inline-block;
    padding: 10px 18px;
    position: relative;
    vertical-align: top;
  } */

  ul {
    display: block;
    width: 400px;
    padding: 0;
    list-style-type: none;
    position: absolute;
    bottom: 140px;

  }

  li {
    float:left;
    clear:left;
    display: block;
    border-radius: 6px 0 6px 0;
    background: rgba(100, 170, 0, .1);
    border: 2px solid rgba(100, 170, 0, .1);
    border-radius: 5px;
    box-shadow: 0 0 6px #B2B2B2;
    margin: 5px;
    padding: 10px 18px;
    /* position: relative; */
    vertical-align: top;
  }

  #me {
    background: #fadadd;
    float: right;
    clear: right;
    
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
      this.form = this.shadowRoot.querySelector('form')
      this.zindex =
      this.message
    }

    connectedCallback() {
      this.form.addEventListener('click', () => {
        this.form.focus()

      })
      this.wsConnect()
    }

    disconnectedCallback() {
      this.wsConnect()
      this.form.addEventListener('click', () => {
      })
    }

    wsConnect() {
      const ws = new WebSocket('wss://cscloud6-127.lnu.se/socket/')
      ws.addEventListener('open', () => {
        console.log('WE ARE CONNECTED')
      })

      ws.addEventListener('message', ({ data }) => {
        console.log(data)
        let li = document.createElement('li')
        let JSONObject = JSON.parse(data)
        let theText = JSONObject.data
        let theName = JSONObject.username

        if(theName === 'KrigarAnka') {
          console.log('JAAAA HEJSAN')
          li.setAttribute('id', 'me')
        }

        li.innerText = `${theName}: ${theText}`
        this.shadowRoot.querySelector('#chat').appendChild(li)
      })

      this.shadowRoot.querySelector('form').addEventListener('submit', event => {
        event.preventDefault()
        let myMessage = this.shadowRoot.querySelector('#message').value
        this.chatMessage(myMessage)
        ws.send(this.message)
        this.shadowRoot.querySelector('#message').value = ''
      })
    }

    chatMessage(myMessage) {

      let myObjectToSend = {
        type: 'message',
        data: `${myMessage}`,
        username: 'KrigarAnka',
        channel: 'my, not so secret, channel',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }

      let json = JSON.stringify(myObjectToSend)
      this.message = json
    }
  })
