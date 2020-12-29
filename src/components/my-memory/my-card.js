const template = document.createElement('template')
template.innerHTML = ` 
<div id="theCard">
  <div  id="flip-card-inner">
    <div id="front"> 
      <img id="firstpic" src="./img/0.png" alt="LNU">  
    </div>
   <div id="back">
    <img class="mariopic" >     
   </div>
  </div>  
</div>

<style>

    #theCard {
      background-color: transparent;
      width: 200px;
      height: 200px;
      /* border: 1px solid #f1f1f1; */
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
  class extends HTMLElement {
    constructor() {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.theCard = this.shadowRoot.querySelector('#theCard')
      this.memoryCard = this.shadowRoot.querySelector('.flipcount')
      this.backImg = this.shadowRoot.querySelector('#back')
      this.frontImg = this.shadowRoot.querySelector('#front')
      this.flipCard = this.flipCard.bind(this)
      this.unflipCards = this.unflipCards.bind(this)

      this.firstCard = true
      this.secondCard = false
      this.selectedCardsCount = 0
      this.cards = []
      this.y = []
      this.currentid
    }

    static get observedAttributes() {
      return ['makethemspin', 'activediv']
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'makethemspin') {
        console.log('makethemspin!')
        this.unflipCards()
      }
      if (name === 'activediv') {
        this.currentid = newValue
      }
    }

    connectedCallback() {
      // this.arrayOfImages()
      this.theCard.addEventListener('click', (e) => {
        // e.preventDefault()
        this.selectedCardsCount++
        this.theCard.classList.add('selected')
        this.currentid = this.parentNode.parentNode.host.parentNode.parentNode.parentNode.host.id
      })
    }

    disconnectedCallback() {
      this.theCard.removeEventListener('click', () => {
        this.theCard.classList.add('selected')
        // this.currentid = this.parentNode.parentNode.host.parentNode.parentNode.parentNode.host.id
      })
    }

    unflipCards() {
      setTimeout(() => {
        // const cards = document.querySelector('my-memory').shadowRoot.querySelectorAll('my-card')

        // const cards = document.querySelector('desktop-window')
        //   .shadowRoot
        //   .querySelector('#windowcontainer')
        //   .querySelector('my-window')
        //   .shadowRoot.querySelector('#mydiv')
        //   .querySelector('#content')
        //   .querySelector('my-memory')
        //   .shadowRoot
        //   .querySelectorAll('my-card')

        const cards = document.querySelector('desktop-window')
          .shadowRoot
          .querySelector('#windowcontainer').querySelector(`#${this.currentid}`)
          .shadowRoot.querySelector('#mydiv')
          .querySelector('#content')
          .querySelector('my-memory')
          .shadowRoot
          .querySelectorAll('my-card')

          console.log(cards)

        cards.forEach((card) => {
          card.shadowRoot.querySelector('#theCard').classList.remove('selected')
        })
      }, 2000)
    }

    flipCard() {
      // this.classList.toggle('flip')
    }
  })
