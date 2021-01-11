/**
 * The my-card web component module.
 *
 * @author Angelica Grass <ag223vg@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
<form> 
<button id="theCard">
  <div  id="flip-card-inner">
    <div id="front"> 
      <img id="firstpic" src="./img/0.png" alt="LNU">  
    </div>
    <div id="back">
    <img class="mariopic" >     
   </div>
  </div>  
</button>
</form>

<style>

    #theCard {
      background-color: transparent;
      width: 200px;
      height: 200px;
      border: none;
      padding: 0;
      perspective: 1000px;
    }

    #flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.8s;
      transform-style: preserve-3d;
    }

    .selected #flip-card-inner {
      transform: rotateY(180deg);
    }

    #front, #back {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden; /* Safari */
      backface-visibility: hidden;
    }

    #back {
        background-color: white;
        border-radius: 10px;
        box-shadow: 10px 10px 30px grey;
        transform: rotateY(180deg);   
    }

    #back img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    #front {
        background-color: #53A08E;
        border-radius: 10px;
        box-shadow: 10px 10px 30px grey;
    }
</style>
`

customElements.define('my-card',
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

      this.theCard = this.shadowRoot.querySelector('#theCard')
      this.memoryCard = this.shadowRoot.querySelector('.flipcount')
      this.backImg = this.shadowRoot.querySelector('#back')
      this.frontImg = this.shadowRoot.querySelector('#front')
      this.unflipCards = this.unflipCards.bind(this)

      this.firstCard = true
      this.secondCard = false
      this.selectedCardsCount = 0
      this.cards = []
      this.y = []
      this.currentid = ''
    }

    /**
     * Watches the attributes "makethemspin" and "activediv" for changes on the element.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['makethemspin', 'activediv']
    }

    /**
     * Called by the browser engine when an attribute changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'makethemspin') {
        this.unflipCards()
      }
      if (name === 'activediv') {
        this.currentid = newValue
      }
    }

    /**
     * Called when the custom element is inserted in the DOM.
     */
    connectedCallback () {
      this.currentid = this.parentNode.parentNode.host.parentNode.parentNode.parentNode.host.id
      this.theCard.addEventListener('click', (e) => {
        e.preventDefault()
      })
    }

    /**
     * Removes connectedCallback.
     */
    disconnectedCallback () {
      this.theCard.removeEventListener('click', () => {
        this.theCard.classList.add('selected')
      })
    }

    /**
     * Flips the cards by removing the class selected.
     *
     */
    unflipCards () {
      setTimeout(() => {
        const cards = document.querySelector('desktop-window')
          .shadowRoot
          .querySelector('#windowcontainer').querySelector(`#${this.currentid}`)
          .shadowRoot.querySelector('#mydiv')
          .querySelector('#content')
          .querySelector('my-memory')
          .shadowRoot
          .querySelectorAll('my-card')

        cards.forEach((card) => {
          card.shadowRoot.querySelector('#theCard').classList.remove('selected')
        })
      }, 2000)
    }
  })
