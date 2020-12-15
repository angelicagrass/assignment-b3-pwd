const template = document.createElement('template')
template.innerHTML = ` 
<ul id="chat"></ul>

<form>
  <textarea rows="8" cols="80" id="message"></textarea>
  <br />
  <button type="submit">Send</button>
</form>


<style>
  #chat {
    list-style-type: none;
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
