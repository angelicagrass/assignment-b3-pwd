const template = document.createElement('template')
template.innerHTML = `




<div id="size"> 



  <!-- <label class="switch">
  <input type="checkbox" id="mycheck">
  <span class="slider round"></span>
  </label> -->


<ul id="chat" class="slidedark">

</ul>

<form id ="colorchange" class="slidedark">
  <div id="chatten">
  <textarea rows="8" cols="50" id="message" class="slidedark"></textarea>
  <br />
  <button id="send" type="submit">Send</button>
  <div id="messageUser"></div>
</div>
<div id="username">
  <p>Enter your username to start the chat</p>
  <label for="username">Username: </label>
  <input type="text" id="usernamefield" name="usernamefield"><br>
  <input id="namebtn" type="submit" value="Submit">
</div>
<label class="switch">
  <input type="checkbox" id="mycheck">
  <span class="slider round"></span>
  </label>

</form>

</div>



<style>
  .darkmode {
  background-color: #413D3D;
}

/* // src slidercode: */

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-top: 5px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
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
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
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
}



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
    bottom: 150px;
    top: 40px;
    overflow: scroll;
    -webkit-transform: rotate(180deg);
  }

  

  li {
    float: right;
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
    -webkit-transform: rotate(180deg);
  }

  #me {
    float: left;
    clear: both;
    background: #fadadd;
    display: block;
    word-break: break-all;
    -webkit-transform: rotate(180deg);
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
      this.chatStart = this.chatStart.bind(this)
      this.nameBtn = this.shadowRoot.querySelector('#namebtn')
      this.inputName = this.shadowRoot.querySelector('#usernamefield')
      this.form = this.shadowRoot.querySelector('form')
      this.chatcontainer = this.shadowRoot.querySelector('#chatten')
      this.slide = this.shadowRoot.querySelector('#mycheck')
      this.allArea = this.shadowRoot.querySelectorAll('.slidedark')
      this.userName = ''
      this.zindex =
      this.message
    }

    connectedCallback() {
      this.chatStart()
      console.log(this.parentNode.parentNode)

      this.form.addEventListener('click', () => {
        this.form.focus()
      })

      this.slide.addEventListener('click', () => {
        if (this.slide.checked === true) {
          console.log('han hittar slidern')
          // this.allArea.classList.add('darkmode')
          console.log(this.allArea)
          this.allArea.forEach(element => {
            element.classList.add('darkmode')
          })
          let x = this.parentNode.parentNode
          x.style.backgroundColor = 'black'
        }

        if (this.slide.checked !== true) {
          console.log('han hittar slidern')
          // this.allArea.classList.add('darkmode')
          console.log(this.allArea)
          this.allArea.forEach(element => {
            element.classList.remove('darkmode')
          })
          let x = this.parentNode.parentNode
          x.style.backgroundColor = 'white'
        }
      })

      this.nameBtn.addEventListener('click', (event) => {
        event.preventDefault()
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

    chatStart () {
      let existing = localStorage.getItem('usernames')

      if (existing) {
        existing = JSON.parse(existing)
        console.log(existing.username)
        this.userName = existing.username
        this.chatcontainer.classList.remove('hide')
        this.shadowRoot.querySelector('#username').style.display = 'none'
        this.wsConnect()
        // OM username finns
      } else {
        this.chatcontainer.classList.add('hide')
        // OM username inte finns
      }

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
        // if (theName === 'Server') {
        //   console.log('han hittar server')
        // }

        li.innerText = `${theName}: ${theText}`
        // this.shadowRoot.querySelector('#chat').appendChild(li)
        let el = this.shadowRoot.querySelector('#chat')
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
