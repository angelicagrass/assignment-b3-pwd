const template = document.createElement('template')
template.innerHTML = ` 
<div id="mycontainer">
<div id="textintro">
<h2 id="starttext">Här ska det va vara en massa text, lite presentation så folk fattar vad dom ska göra.</h2>
<div id="backbox" class='hide'>
  <h2 id="quotetext" class="hide">test</h2>
</div>

  <button id="newrandombtn" class="hide">NEXT</button>


</div>
  <div id="buttoncontainer">
    <button id="getquote">FUNNY QUOTE</button>
    <button id="getmeanquote">MEAN QUOTE</button>
  </div>
</div>


<style>
  #backbox {
    background: rgba(255,255,255, 0.7);
    border-radius: 3px;
    padding: 10px 10px 40px 10px;
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
  width:50%;
  margin-left:25%;
  margin-right:25%;
  margin-top: 80px;

}

#quotetext {
  padding-top: 10%;

}

  #mycontainer {
    text-align: center;
  }
  #buttoncontainer {
    margin-top: 60%;
  }

  #getquote, #getmeanquote {
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

  #mycontainer {
    min-height: 600px;
    min-width: 400px;
  }



  
</style>
`

customElements.define('my-own',
  class extends HTMLElement {
    constructor() {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.quoteBtn = this.shadowRoot.querySelector('#getquote')
      this.meanBtn = this.shadowRoot.querySelector('#getmeanquote')
      this.btnContainer = this.shadowRoot.querySelector('#buttoncontainer')
      this.startText = this.shadowRoot.querySelector('#starttext')
      this.quoteText = this.shadowRoot.querySelector('#quotetext')
      this.newRandomBtn = this.shadowRoot.querySelector('#newrandombtn')
      this.backBox = this.shadowRoot.querySelector('#backbox')
      this.funnyQuotes = this.funnyQuotes.bind(this)
      this.meanQuotes = this.meanQuotes.bind(this)
      this.quotesOnScreen = this.quotesOnScreen.bind(this)
      this.randomBackground = this.randomBackground.bind(this)
      this.currentQuote = ''
    }

    connectedCallback() {
      this.quoteBtn.addEventListener('click', () => {
        console.log('hallå')
        this.funnyQuotes()

      })
      this.meanBtn.addEventListener('click', () => {
        console.log('mean btn')
        this.meanQuotes()
      })

      this.newRandomBtn.addEventListener('click', () => {
        console.log('knappen fungerar')
        this.funnyQuotes()
      })
    }

    async funnyQuotes() {
      this.btnContainer.classList.add('hide')

      let result = await fetch('https://type.fit/api/quotes')
      result = await result.json()

      const random = Math.floor(Math.random() * result.length)

      this.currentQuote = result[random].text
      console.log(this.currentQuote)

      this.quotesOnScreen()
    }

    async meanQuotes() {
      // let result = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
      // result = await result.json()

      // const getMean = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json', {
      //   method: 'GET',
      //   headers: {
      //     'Access-Control-Allow-Origin': ''
      //   }
      // }).then((response) => {
      //   if (response.status !== 200) {
      //     console.log(response)
      //   } else {
      //     return response
      //   }
      // })
      // const resp = await getMean.json()
      // console.log(resp)

      let getMeanUrl = 'https://evilinsult.com/generate_insult.php?lang=en&type=json'

      const dom = await this._getDom(getMeanUrl)
      const meanUrl = Array.from(dom.window.document.querySelectorAll('#insult'))

      console.log(meanUrl)
    }

    async _getDom (link) {
      const text = await this._getText(link)
      const linkDom = new JSDOM(text)
      return linkDom
    }

    async _getText (url) {
      const response = await fetch(url)
  
      return response.text()
    }
  













    async randomBackground() {
      let image = await fetch('https://source.unsplash.com/user/dmosipenko')
      // image = await image.json()
      image = image.url
      this.parentNode.style.backgroundImage = `url(${image})`
    }




    quotesOnScreen() {
      this.randomBackground()
      console.log('we are on screen')
      this.startText.innerHTML = ''
      this.backBox.classList.remove('hide')
      this.quoteText.classList.remove('hide')
      this.newRandomBtn.classList.remove('hide')
      this.quoteText.textContent = `${this.currentQuote}`


    }

    disconnectedCallback() {


    }
  })
