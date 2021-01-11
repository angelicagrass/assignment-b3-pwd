const template = document.createElement('template')
template.innerHTML = ` 
<div id="mycontainer">
  <h2 id="starttext">Get some random quote by pressing the button</h2>
    <div id="textintro">
      <div id="backbox" class='hide'>
        <h2 id="quotetext" class="hide">test</h2>    
      </div>
    </div>
      <div id="buttoncontainer">
        <button id="getquote">RANDOM QUOTE</button>
      </div>
    </div>
  <div id="next">
    <button id="newrandombtn" class="hide">NEXT</button>
</div>

<style>
  #next {
    position:static;
    width: 100%;
    display: flex;
   justify-content: center;
   align-items: center;
   padding-bottom: 50px;
  }

  #starttext {
    margin-top: 50px;
  }

  h2 {
    text-align: center;
  }

#backbox {
  background: rgba(255,255,255, 0.7);
  border-radius: 3px;
  position: absolute;
  padding: 5px 0px 40px 0px;
  z-index: 8;
  width: 100%;
  height:200px;
}

.myimg {
  border-radius: 5px;

}
.fade-in {
  animation: fadeIn 3s;
  opacity: 1;
}

@keyframes fadeIn {
  from {
  opacity: 0;
  }
  to {
  opacity: 1;
  }
}

.fade-out {
  animation: fadeOut 2s;
  opacity: 0;

}

@keyframes fadeOut {
  from {
  opacity: 1;
  }
  to {
  opacity: 0;
  }
}

.hide {
  display: none;
}

#newrandombtn {
  padding: 25px 0px;
  border-radius: 10px;
  background-color: #7EBEA3;
  font-weight: 600;
  border: none;
  border-bottom: 4px solid #53A08E;
  color: white;
  font-size: larger;
  transition-duration: 0.4s;
  width:200px;
  bottom: 0px;
  left: 50%;

  z-index: 9;

}

#quotetext {
  padding-top: 10%;
  max-width: 400px;
  margin: 0 auto;
}

  #mycontainer {
    text-align: center;
    border-radius: 3px;
    position: relative;
    margin-top: 0px;
    min-height: 500px;
    min-width: 400px;
  }

  #buttoncontainer {
    margin-top: 60%;

  }

  #getquote {
    padding: 25px 0px;
    border-radius: 10px;
    background-color: #7EBEA3;
    font-weight: 600;
    border: none;
    border-bottom: 4px solid #53A08E;
    color: white;
    font-size: larger;
    transition-duration: 0.4s;
    width:50%;
    margin-left:25%;
    margin-right:25%;
    margin-bottom: 20px;
  }
</style>
`

customElements.define('my-own',
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

      this.quoteBtn = this.shadowRoot.querySelector('#getquote')
      this.btnContainer = this.shadowRoot.querySelector('#buttoncontainer')
      this.startText = this.shadowRoot.querySelector('#starttext')
      this.quoteText = this.shadowRoot.querySelector('#quotetext')
      this.newRandomBtn = this.shadowRoot.querySelector('#newrandombtn')
      this.backBox = this.shadowRoot.querySelector('#backbox')
      this.myContainer = this.shadowRoot.querySelector('#mycontainer')
      this.funnyQuotes = this.funnyQuotes.bind(this)

      this.quotesOnScreen = this.quotesOnScreen.bind(this)
      this.randomBackground = this.randomBackground.bind(this)

      this.image =
      this.currentQuote = ''
      this.firstImage = true
    }

    /**
     * Called when the custom element is inserted in the DOM.
     */
    connectedCallback () {
      this.quoteBtn.addEventListener('click', () => {
        this.funnyQuotes()
      })

      this.newRandomBtn.addEventListener('click', () => {
        if (this.firstImage === false) {
          const imageToChange = this.shadowRoot.querySelector('.myimg')
          imageToChange.classList.add('fade-out')
          const fadeText = this.shadowRoot.querySelector('#quotetext')
          fadeText.classList.add('fade-out')
        }
        setTimeout(() => {
          this.funnyQuotes()
        }, 1500)
      })
    }

    /**
     * Removes eventlistener.
     */
    disconnectedCallback () {
      this.quoteBtn.removeEventListener('click', () => {
        this.funnyQuotes()
      })

      this.newRandomBtn.removeEventListener('click', () => {
        if (this.firstImage === false) {
          const imageToChange = this.shadowRoot.querySelector('.myimg')
          imageToChange.classList.add('fade-out')
          const fadeText = this.shadowRoot.querySelector('#quotetext')
          fadeText.classList.add('fade-out')
        }
        setTimeout(() => {
          this.funnyQuotes()
        }, 1500)
      })
    }

    /**
     * Fetches first background image from unsplash api.
     *
     */
    async loadImg () {
      const image = await fetch('https://source.unsplash.com/user/dmosipenko')
      this.image = image.url
    }

    /**
     * Fetches background image from unsplash api.
     *
     */
    async funnyQuotes () {
      this.btnContainer.classList.add('hide')
      const fadeText = this.shadowRoot.querySelector('#quotetext')
      fadeText.classList.remove('fade-out')
      fadeText.classList.add('fade-in')

      let result = await fetch('https://type.fit/api/quotes')
      result = await result.json()

      const random = Math.floor(Math.random() * result.length)

      this.currentQuote = result[random].text
      console.log(this.currentQuote)

      this.quotesOnScreen()
    }

    /**
     * Fetches background image from unsplash api.
     *
     */
    async randomBackground () {
      const image = await fetch('https://source.unsplash.com/user/dmosipenko/500x400')
      this.image = image.url

      if (this.firstImage === false) {
        const imageToChange = this.shadowRoot.querySelector('.myimg')
        this.myContainer.removeChild(imageToChange)
        const el = document.createElement('img')
        el.src = `${this.image}`
        el.classList.add('myimg')
        this.myContainer.appendChild(el)
        el.classList.add('fade-in')
      }
      if (this.firstImage === true) {
        this.firstImage = false
        const el = document.createElement('img')
        el.src = `${this.image}`
        el.classList.add('myimg')
        this.myContainer.appendChild(el)
        el.classList.add('fade-in')
      }
    }

    /**
     * Current quote on screen.
     *
     */
    quotesOnScreen () {
      this.randomBackground()
      console.log('we are on screen')
      this.startText.innerHTML = ''
      this.backBox.classList.remove('hide')
      this.quoteText.classList.remove('hide')
      this.newRandomBtn.classList.remove('hide')
      this.quoteText.textContent = `${this.currentQuote}`
    }
  })
