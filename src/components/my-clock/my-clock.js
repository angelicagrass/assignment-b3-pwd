
const template = document.createElement('template')
template.innerHTML = ` 
<div id="clockcontainer" class="clock" onload="showTime()">
</div>

<style>
.clock {
    position: absolute;
    top: 50%;
    right: 1%;
    transform: translateX(-50%) translateY(-50%);
    color: white;
    font-size: 15px;
    letter-spacing: 7px;
}
</style>
`

customElements.define('my-clock',
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

      this.showTime = this.showTime.bind(this)
    }

    /**
     * Called when the custom element is inserted in the DOM.
     */
    connectedCallback () {
      this.showTime()
    }

    /**
     * Removes connectedCallback.
     */
    disconnectedCallback () {
      this.showTime()
    }

    /**
     * Creates a digital clock.
     */
    showTime () {
      // code src = https://codepen.io/afarrar/pen/JRaEjP
      const date = new Date()
      let h = date.getHours() // 0 - 23
      let m = date.getMinutes() // 0 - 59
      let s = date.getSeconds() // 0 - 59
      let session = 'AM'

      if (h === 0) {
        h = 12
      }
      if (h > 12) {
        h = h - 12
        session = 'PM'
      }

      h = (h < 10) ? '0' + h : h
      m = (m < 10) ? '0' + m : m
      s = (s < 10) ? '0' + s : s

      const time = h + ':' + m + ':' + s + ' ' + session
      this.shadowRoot.querySelector('#clockcontainer').innerText = time
      this.shadowRoot.querySelector('#clockcontainer').textContent = time

      setTimeout(this.showTime, 1000)
    }
  })
