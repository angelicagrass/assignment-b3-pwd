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
    font-size: 20px;
    /* font-family: Orbitron; */
    letter-spacing: 7px;
}


</style>
`

customElements.define('my-clock',
  class extends HTMLElement {
    constructor() {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.showTime = this.showTime.bind(this)

    }

    connectedCallback() {

      this.showTime()
    }

    disconnectedCallback() {

    }

    showTime () {
      // code src = https://codepen.io/afarrar/pen/JRaEjP
      let date = new Date()
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
