import './my-card.js'

const template = document.createElement('template')
template.innerHTML = `


  <div id="scorecontainer">
    <h2 id="scoretext"></h2>
    <h2 id="score"></h2>
  </div>
  

<div id="grid" class="shufflecontainer">
  

</div>
<h2 id="winner"></h2>
<h2 id="buttonheader">Choose the size of your game</h2>
<div id="buttons">
  <button id="fourxfour" class="sizebutton">4x4</button>
  <button id="fourxtwo" class="sizebutton">4x2</button>
  <button id="twoxtwo" class="sizebutton">2x2</button>
</div>


<style>

#scorecontainer {
  margin-top: 30px;
  margin-bottom: 30px;
  }


h2 {
  letter-spacing: 4px;
  font-weight: 100;
  font-size: 30px;
  display: inline;
  
}

#grid {
    visibility: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    column-gap: 10px;
    row-gap: 10px;
}
#grid2 {
    visibility: hidden;
    display: inline-grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    column-gap: 10px;
    row-gap: 10px; 

}

 .hide {
   visibility: hidden;
   transition: 0.8s;

 }

 #buttons {
   display: flex;
   justify-content: center;
 }

 .sizebutton {
  padding: 32px 50px;
	border-radius: 10px;
	background-color: rgba(100, 170, 0, .1);
	font-weight: 100;
	font-size: larger;
	transition-duration: 0.4s;
  margin: 20px;
 }

 .scorecontainer {
   display: inline-block;
 }
</style>
`

customElements.define('my-memory',
  class extends HTMLElement {
    constructor() {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.arrayOfImages = this.arrayOfImages.bind(this)

      this.compareCards = this.compareCards.bind(this)
      this.startGameTable = this.startGameTable.bind(this)
      this.container = this.shadowRoot.querySelector('#grid')
      this.scoreText = this.shadowRoot.querySelector('#score')
      this.winner = this.shadowRoot.querySelector('#winner')
      this.fourXfourBtn = this.shadowRoot.querySelector('#fourxfour')
      this.fourXtwoBtn = this.shadowRoot.querySelector('#fourxtwo')
      this.twoXtwoBtn = this.shadowRoot.querySelector('#twoxtwo')
      this.btnContainer = this.shadowRoot.querySelector('#buttons')
      this.headerText = this.shadowRoot.querySelector('#scoretext')
      this.btnHeader = this.shadowRoot.querySelector('#buttonheader')
      this.smallBoard = false
      this.howManyCards =
      this.flippedCardsNumber = []
      this.currentAttempts = 0
      this.wincounter
    }

    connectedCallback() {
      this.container.addEventListener('click', (event) => {
        if (event.target.id !== this.container.id) {
          if (this.flippedCardsNumber.length < 3) {
            console.log(event.target.attributes.cardname.value)
            const currentCard = event.target.attributes.cardname.value
            this.flippedCardsNumber.push(currentCard)
            console.log(this.flippedCardsNumber)
            this.compareCards()
          }
        }
      })
      this.fourXfourBtn.addEventListener('click', () => {
        this.howManyCards = 8
        this.wincounter = 8
        this.arrayOfImages()
        this.startGameTable()
      })
      this.fourXtwoBtn.addEventListener('click', () => {
        this.howManyCards = 4
        this.wincounter = 4
        this.arrayOfImages()
        this.startGameTable()
      })
      this.twoXtwoBtn.addEventListener('click', () => {
        this.smallBoard = true
        this.howManyCards = 2
        this.wincounter = 2
        this.arrayOfImages()
        this.container.setAttribute('id', 'grid2')
        this.startGameTable()
      })

      this.arrayOfImages()
    }



    startGameTable() {
      this.container.style.visibility = "visible"
      this.btnContainer.style.display = "none"
      this.btnHeader.style.visibility = 'hidden'
      this.headerText.textContent = 'NUMBER OF ATTEMPTS '
      this.scoreText.textContent = this.currentAttempts
    }

    compareCards() {
      if (this.flippedCardsNumber.length === 2) {
        if (this.flippedCardsNumber[0] === this.flippedCardsNumber[1]) {
          this.wincounter--
          console.log(this.wincounter)

          if (this.wincounter === 0) {
            this.winner.textContent = 'WINNER'
          }

          let cardToHide

          if (this.smallBoard === true) {
            cardToHide = this.shadowRoot.querySelector('#grid2').querySelectorAll(`[cardname=${this.flippedCardsNumber[1]}]`)

          } else {
            cardToHide = this.shadowRoot.querySelector('#grid').querySelectorAll(`[cardname=${this.flippedCardsNumber[1]}]`)

          }
          this.flippedCardsNumber = []
          this.currentAttempts++
          this.scoreText.textContent = this.currentAttempts

          setTimeout(() => {
            cardToHide.forEach((card) => {
              card.classList.add('hide')
            })
            console.log(cardToHide)
          }, 1500)

          console.log(this.container)

          // if (this.container.childNodes.length = 1) { 
          //   console.log('ENDGAME')
          // }
        } else {
          this.flippedCardsNumber = []
          this.currentAttempts++
          this.scoreText.textContent = this.currentAttempts
          this.shadowRoot.querySelector('my-card').setAttribute('makethemspin', 0)
        }
      } else {
        console.log('Inte två kort?')
      }
    }

    arrayOfImages() {
      const imgArray = []

      for (let i = 0; i < this.howManyCards; i++) {
        imgArray.push(document.createElement('img'))
      }
      for (let i = 0; i < imgArray.length; i++) {
        imgArray[i].setAttribute('src', `./img/A${[i + 1]}.jpg`)
      }
      console.log(imgArray)

      for (let i = 0; i < imgArray.length; i++) {
        for (let j = 0; j < 2; j++) {
          const memoryCard = document.createElement('my-card')
          memoryCard.setAttribute('cardname', 'm' + i)
          this.container.appendChild(memoryCard)
          memoryCard.shadowRoot.querySelector('.mariopic').src = imgArray[i].src
        }
      }

      let parent = this.shadowRoot.querySelector('.shufflecontainer')
      let divs = parent.children
      let frag = document.createDocumentFragment()

      while (divs.length) {
        frag.appendChild(divs[Math.floor(Math.random() * divs.length)])
      }
      parent.appendChild(frag)
    }
  })
