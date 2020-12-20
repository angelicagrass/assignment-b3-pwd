const template = document.createElement('template')
template.innerHTML = ` 
<div id="mycontainer">
<div id="textintro">
<h2 id="starttext">Här ska det va vara en massa text, lite presentation så folk fattar vad dom ska göra.</h2>
<h2 id="quotetext" class="hide">test</h2>

</div>
  <div id="buttoncontainer">
    <button id="getquote">FUNNY QUOTE</button>
    <button id="getmeanquote">MEAN QUOTE</button>
  </div>
</div>


<style>

.hide {
  display: none;
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
      this.funnyQuotes = this.funnyQuotes.bind(this)
      this.meanQuotes = this.meanQuotes.bind(this)
      this.quotesOnScreen = this.quotesOnScreen.bind(this)
      this.currentQuote = ''
    }

    connectedCallback() {
      this.quoteBtn.addEventListener('click', () => {
        console.log('hallå')
        this.funnyQuotes()
      })
      this.meanBtn.addEventListener('click', () => {
        console.log('mean btn')
      })
    }

    async funnyQuotes() {
      this.btnContainer.classList.add('hide')

      let result = await fetch("https://type.fit/api/quotes")
      result = await result.json()

      const random = Math.floor(Math.random() * result.length)

      this.currentQuote = result[random].text

      console.log(this.currentQuote)
       
    }

    meanQuotes() {

    }


    quotesOnScreen(quote) {
      console.log('we are on screen')


    }

    disconnectedCallback() {

    }
  })
