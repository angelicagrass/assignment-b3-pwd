const template = document.createElement('template')
template.innerHTML = ` 
<div id="mycontainer">Här ska mitt hamna</div>
<button id="getquote">knapp</button>


<style>

  #mycontainer {
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
    }

    connectedCallback() {
      this.quoteBtn.addEventListener('click', () => {
        console.log('hallå')

      })

    }

    disconnectedCallback() {

    }
  })
