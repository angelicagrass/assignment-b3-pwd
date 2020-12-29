const template = document.createElement('template')
template.innerHTML = ` 
<div id="clockcontainer" class="clock" onload="showTime()">
</div>



<style>

</style>
`

customElements.define('my-clock',
  class extends HTMLElement {
    constructor() {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

    }

    connectedCallback() {
    }

    disconnectedCallback() {


    }
  })