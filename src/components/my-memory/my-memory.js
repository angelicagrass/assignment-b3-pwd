/**
 * The my-memory web component module.
 *
 * @author Angelica Grass <ag223vg@student.lnu.se>
 * @version 1.0.0
 */

import './my-card.js'
import '../my-trophy/my-trophy.js'

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <div id="scorecontainer">
    <h2 id="scoretext"></h2>
    <h2 id="score"></h2>
  </div>
<div id="grid" class="shufflecontainer">
</div>
<div id="centertext">
  <h2 id="winner"></h2>
  <h2 id="buttonheader">Choose the size of your game</h2>
</div>
<div id="buttons">
  <button id="fourxfour" class="sizebutton">4x4</button>
  <button id="fourxtwo" class="sizebutton">4x2</button>
  <button id="twoxtwo" class="sizebutton">2x2</button>
</div>
<div id="resetBtnDiv">
  <button id="resetBtn" class="hidenone">Try Again!</button>
</div>
<div id="switchemoji" class="hide">
    <label class="switch">
      <input type="checkbox" id="mycheck">
      <span class="slider round"></span>
    </label>
  </div>
<style>

#switchemoji {
    display: inline-block;
    position: relative;
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

#centertext {
  text-align: center;
  width: 100%;
  justify-content: center;
  height: 50px;
  margin-top: 20px;

}

#scorecontainer {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
  }

#resetBtnDiv {
  text-align: center;
  width: 100%;
  justify-content: center;
}

#resetBtn {
  position: relative;
  padding: 16px 25px;
  border-radius: 10px;
  background-color: #7EBEA3;
  font-weight: 600;
  border: none;
  border-bottom: 4px solid #53A08E;
  color: white;
  font-size: larger;
  transition-duration: 0.4s;
  margin: 20px;

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

.resetgrid2 {
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

.hidenone {
  display: none;

 }

 #buttons {
   display: flex;
   justify-content: center;
 }

 .sizebutton {
  padding: 32px 50px;
  border-radius: 10px;
  background-color: #7EBEA3;
  font-weight: 600;
  border: none;
  border-bottom: 4px solid #53A08E;
  color: white;
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

      this.arrayOfImages = this.arrayOfImages.bind(this)

      this.compareCards = this.compareCards.bind(this)
      this.startGameTable = this.startGameTable.bind(this)
      this.resetMemory = this.resetMemory.bind(this)
      this.darkmode = this.darkmode.bind(this)
      this.slideDiv = this.shadowRoot.querySelector('#switchemoji')
      this.slide = this.shadowRoot.querySelector('#mycheck')
      this.container = this.shadowRoot.querySelector('#grid')
      this.scoreText = this.shadowRoot.querySelector('#score')
      this.winner = this.shadowRoot.querySelector('#winner')
      this.fourXfourBtn = this.shadowRoot.querySelector('#fourxfour')
      this.fourXtwoBtn = this.shadowRoot.querySelector('#fourxtwo')
      this.twoXtwoBtn = this.shadowRoot.querySelector('#twoxtwo')
      this.btnContainer = this.shadowRoot.querySelector('#buttons')
      this.headerText = this.shadowRoot.querySelector('#scoretext')
      this.btnHeader = this.shadowRoot.querySelector('#buttonheader')
      this.resetBtn = this.shadowRoot.querySelector('#resetBtn')
      this.selectedCardsCount = 0
      this.smallBoard = false
      this.howManyCards =
      this.flippedCardsNumber = []
      this.currentAttempts = 0
      this.wincounter = 0
    }

    /**
     * Called when the custom element is inserted in the DOM.
     */
    connectedCallback () {
      this.container.addEventListener('click', (event) => {
        console.log(event.target)

        this.selectedCardsCount++

        if (this.selectedCardsCount < 3) {
          const theCard = event.target.shadowRoot.querySelector('#theCard')
          theCard.classList.add('selected')
        }

        if (event.target.id !== this.container.id) {
          if (this.flippedCardsNumber.length < 2 && !event.target.classList.contains('clicked')) {
            event.target.classList.add('clicked')

            const currentCard = event.target.attributes.cardname.value
            this.flippedCardsNumber.push(currentCard)

            if (this.flippedCardsNumber.length === 2) {
              this.compareCards()
            }
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

      this.resetBtn.addEventListener('click', () => {
        console.log('RESET')
        this.resetMemory()
      })
      this.slide.addEventListener('click', () => {
        console.log('sliiide')
        this.darkmode()
      })

      this.arrayOfImages()
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.container.removeEventListener('click', (event) => {
        if (event.target.id !== this.container.id) {
          if (this.flippedCardsNumber.length < 3) {
            const currentCard = event.target.attributes.cardname.value
            this.flippedCardsNumber.push(currentCard)
            this.compareCards()
          }
        }
      })
      this.fourXfourBtn.removeEventListener('click', () => {
        this.howManyCards = 8
        this.wincounter = 8
        this.arrayOfImages()
        this.startGameTable()
      })
      this.fourXtwoBtn.removeEventListener('click', () => {
        this.howManyCards = 4
        this.wincounter = 4
        this.arrayOfImages()
        this.startGameTable()
      })
      this.twoXtwoBtn.removeEventListener('click', () => {
        this.smallBoard = true
        this.howManyCards = 2
        this.wincounter = 2
        this.arrayOfImages()
        this.container.setAttribute('id', 'grid2')
        this.startGameTable()
      })

      this.resetBtn.removeEventListener('click', () => {
        console.log('RESET')
        this.resetMemory()
      })
      this.arrayOfImages()
    }

    /**
     * Set up the game.
     */
    startGameTable () {
      this.slideDiv.classList.remove('hide')
      this.container.style.visibility = 'visible'
      this.btnContainer.style.display = 'none'
      this.btnHeader.style.display = 'none'
      this.headerText.textContent = 'NUMBER OF ATTEMPTS '
      this.scoreText.textContent = this.currentAttempts
    }

    /**
     * Compares the cards and flipp them back or hides them if they are a match.
     */
    compareCards () {
      if (this.flippedCardsNumber.length === 2) {
        if (this.flippedCardsNumber[0] === this.flippedCardsNumber[1]) {
          this.wincounter--

          if (this.wincounter === 0) {
            this.container.style.display = 'none'
            this.resetBtn.classList.remove('hidenone')

            setTimeout(() => {
              const trophy = document.createElement('my-trophy')
              this.shadowRoot.querySelector('#centertext').appendChild(trophy)
            }, 2000)
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
          }, 1500)
        } else {
          console.log('hej')
          let clickedCards
          if (this.smallBoard === true) {
            clickedCards = this.shadowRoot.querySelector('#grid2').querySelectorAll('my-card')
          } else {
            clickedCards = this.shadowRoot.querySelector('#grid').querySelectorAll('my-card')
          }
          clickedCards.forEach((card) => {
            card.classList.remove('clicked')
          })
          this.flippedCardsNumber = []
          this.currentAttempts++
          this.scoreText.textContent = this.currentAttempts
          this.shadowRoot.querySelector('my-card').setAttribute('makethemspin', 0)
        }
        setTimeout(() => {
          this.selectedCardsCount = 0
        }, 2000)
      }
    }

    /**
     * Creates memorycards with images.
     */
    arrayOfImages () {
      const imgArray = []

      for (let i = 0; i < this.howManyCards; i++) {
        imgArray.push(document.createElement('img'))
      }
      for (let i = 0; i < imgArray.length; i++) {
        imgArray[i].setAttribute('src', `./img/A${[i + 1]}.png`)
      }

      for (let i = 0; i < imgArray.length; i++) {
        for (let j = 0; j < 2; j++) {
          const memoryCard = document.createElement('my-card')
          memoryCard.setAttribute('cardname', 'm' + i)
          this.container.appendChild(memoryCard)
          memoryCard.shadowRoot.querySelector('.mariopic').src = imgArray[i].src
        }
      }

      const parent = this.shadowRoot.querySelector('.shufflecontainer')
      const divs = parent.children
      const frag = document.createDocumentFragment()

      while (divs.length) {
        frag.appendChild(divs[Math.floor(Math.random() * divs.length)])
      }
      parent.appendChild(frag)
    }

    /**
     * Reset game without reload.
     */
    resetMemory () {
      const trophy = this.shadowRoot.querySelector('my-trophy')
      trophy.style.display = 'none'
      const bigTable = this.shadowRoot.querySelector('#grid')
      this.resetBtn.classList.add('hidenone')
      this.winner.textContent = ''

      if (this.howManyCards === 8) {
        while (bigTable.firstChild) {
          bigTable.removeChild(bigTable.lastChild)
        }
        bigTable.style.display = 'grid'
        this.wincounter = 8
        this.arrayOfImages()
        this.startGameTable()
      } else if (this.howManyCards === 4) {
        this.shadowRoot.querySelector('#centertext').removeChild('my-trophy')
        this.wincounter = 4
        this.arrayOfImages()
        this.startGameTable()
      } else if (this.howManyCards === 2) {
        const gametable = this.shadowRoot.querySelector('#grid2')

        while (gametable.firstChild) {
          gametable.removeChild(gametable.lastChild)
        }
        gametable.style.display = 'inline-grid'
        gametable.classList.add('resetgrid2')
        this.howManyCards = 2
        this.wincounter = 2
        this.arrayOfImages()
        this.startGameTable()
      }
    }

    /**
     * Darkmode toggle.
     */
    darkmode () {
      const windowDiv = this.shadowRoot.host.parentNode.parentNode
      const cards = this.shadowRoot.querySelector('#grid').querySelectorAll('my-card')

      if (this.slide.checked === true) {
        windowDiv.style.backgroundColor = '#413D3D'
        cards.forEach((card) => {
          const x = card.shadowRoot.querySelector('#front')
          x.style.backgroundColor = 'black'
        })
      }
      if (this.slide.checked !== true) {
        windowDiv.style.backgroundColor = 'white'
        cards.forEach((card) => {
          const x = card.shadowRoot.querySelector('#front')
          x.style.backgroundColor = '#53A08E'
        })
      }
    }
  })
