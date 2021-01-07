const template = document.createElement('template')
template.innerHTML = `
 <img src="" alt="moneysymbol" class="moneyimg">
  <h1>Exchange Rate Calculator</h1>
  <p>Choose the currency and the amounts to get exchange rate</p>


<style>

    
</style>
`

customElements.define('my-card',
  class extends HTMLElement {
    constructor() {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }

    /**
     * Called when the custom element is inserted in the DOM.
     */
    connectedCallback () {
     
    }

    /**
     * Removes connectedCallback.
     */
    disconnectedCallback () {
 
    }

  })
