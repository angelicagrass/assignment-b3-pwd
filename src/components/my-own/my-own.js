const template = document.createElement('template')
template.innerHTML = ` 
<div id="mycontainer">

    <h2 id="starttext">Här ska det va vara en massa text, lite presentation så folk fattar vad dom ska göra.</h2>
    <div id="textintro">
      <div id="backbox" class='hide'>
        <h2 id="quotetext" class="hide">test</h2>
        
        
      </div>




    </div>
      <div id="buttoncontainer">
        <button id="getquote">FUNNY QUOTE</button>
          <button id="getmeanquote">MEAN QUOTE</button>
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
    margin-top: 0px;
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

  /* h2 {
    position: absolute;
    z-index: 9;
  } */


  /* TEST__________________________________________________*/

















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
      this.myContainer = this.shadowRoot.querySelector('#mycontainer')
      this.funnyQuotes = this.funnyQuotes.bind(this)
      this.meanQuotes = this.meanQuotes.bind(this)
      this.quotesOnScreen = this.quotesOnScreen.bind(this)
      this.randomBackground = this.randomBackground.bind(this)
      this.image =
      this.currentQuote = ''
      this.firstImage = true
    }

    connectedCallback() {
      // this.loadImg()

      this.quoteBtn.addEventListener('click', () => {
        console.log('hallå')
        this.funnyQuotes()

      })
      this.meanBtn.addEventListener('click', () => {
        console.log('mean btn')
        this.meanQuotes()
      })

      this.newRandomBtn.addEventListener('click', () => {
        if (this.firstImage === false) {
          let imageToChange = this.shadowRoot.querySelector('.myimg')
          imageToChange.classList.add('fade-out')
          let fadeText = this.shadowRoot.querySelector('#quotetext')
          fadeText.classList.add('fade-out')
        }


        setTimeout(() => {
          this.funnyQuotes()
        }, 1500)

        console.log('knappen fungerar')
        
      })
    }

    async loadImg () {
      let image = await fetch('https://source.unsplash.com/user/dmosipenko')
      // image = await image.json()
      this.image = image.url


    }

    async funnyQuotes() {
      this.btnContainer.classList.add('hide')



      let fadeText = this.shadowRoot.querySelector('#quotetext')
      fadeText.classList.remove('fade-out')
      fadeText.classList.add('fade-in')

      let result = await fetch('https://type.fit/api/quotes')
      result = await result.json()

      const random = Math.floor(Math.random() * result.length)

      this.currentQuote = result[random].text
      console.log(this.currentQuote)

      this.quotesOnScreen()
    }

    async meanQuotes() {
      let result = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
      result = await result.json()

      console.log(result)

      // const getMean = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json', {
      //   method: 'GET',
      //   headers: {
      //     'Access-Control-Allow-Origin': '*'
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

      // let getMeanUrl = 'https://evilinsult.com/generate_insult.php?lang=en&type=json'

      // const dom = await this._getDom(getMeanUrl)
      // const meanUrl = Array.from(dom.window.document.querySelectorAll('#insult'))

      // console.log(meanUrl)
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
      let image = await fetch('https://source.unsplash.com/user/dmosipenko/500x400')
      this.image = image.url

      if (this.firstImage === false) {

        let imageToChange = this.shadowRoot.querySelector('.myimg')
        this.myContainer.removeChild(imageToChange)


        let el = document.createElement('img')
        el.src = `${this.image}`
        el.classList.add('myimg')
        this.myContainer.appendChild(el)
        el.classList.add('fade-in')
      }
      

      if (this.firstImage === true) {
        this.firstImage = false
        let el = document.createElement('img')
        el.src = `${this.image}`
        el.classList.add('myimg')
        this.myContainer.appendChild(el)
        el.classList.add('fade-in')
      }
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
