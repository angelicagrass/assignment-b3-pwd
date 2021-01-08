// from tutorial: https://www.udemy.com/course/web-projects-with-vanilla-javascript/learn/lecture/17842134#content


const template = document.createElement('template')
template.innerHTML = `
 <img src="./img/currency.png" alt="moneysymbol" class="moneyimg">
  <h1>Currency Converter</h1>
    <p>Choose the currency and the amounts to get exchange rate</p>
  <div class="container">
    <div class="currency">
      <select id="currency-one">
      <option value="AED">AED</option>
        <option value="ARS">ARS</option>
        <option value="AUD">AUD</option>
        <option value="BGN">BGN</option>
        <option value="BRL">BRL</option>
        <option value="BSD">BSD</option>
        <option value="CAD">CAD</option>
        <option value="CHF">CHF</option>
        <option value="CLP">CLP</option>
        <option value="CNY">CNY</option>
        <option value="COP">COP</option>
        <option value="CZK">CZK</option>
        <option value="DKK">DKK</option>
        <option value="DOP">DOP</option>
        <option value="EGP">EGP</option>
        <option value="EUR">EUR</option>
        <option value="FJD">FJD</option>
        <option value="GBP">GBP</option>
        <option value="GTQ">GTQ</option>
        <option value="HKD">HKD</option>
        <option value="HRK">HRK</option>
        <option value="HUF">HUF</option>
        <option value="IDR">IDR</option>
        <option value="ILS">ILS</option>
        <option value="INR">INR</option>
        <option value="ISK">ISK</option>
        <option value="JPY">JPY</option>
        <option value="KRW">KRW</option>
        <option value="KZT">KZT</option>
        <option value="MXN">MXN</option>
        <option value="MYR">MYR</option>
        <option value="NOK">NOK</option>
        <option value="NZD">NZD</option>
        <option value="PAB">PAB</option>
        <option value="PEN">PEN</option>
        <option value="PHP">PHP</option>
        <option value="PKR">PKR</option>
        <option value="PLN">PLN</option>
        <option value="PYG">PYG</option>
        <option value="RUB">RUB</option>
        <option value="SAR">SAR</option>
        <option value="SEK" selected>SEK</option>
        <option value="SGD">SGD</option>
        <option value="TRY">TRY</option>
        <option value="UAH">UAH</option>
        <option value="USD">USD</option>
        <option value="UYU">UYU</option>
        <option value="VND">VND</option>
        <option value="ZAR">ZAR</option>
        <option value=""></option>
        <option value=""></option>
      </select>
      <input type="number" id="amount-one" placeholder="0" value="1">
    </div>

    <div class="swap-rate-container">
      <button class="btn" id="swap">SWAP</button>
    <div class="rate" id="rate"></div>
    </div>
    <div class="currency">
      <select id="currency-two">
      <option value="AED">AED</option>
        <option value="ARS">ARS</option>
        <option value="AUD">AUD</option>
        <option value="BGN">BGN</option>
        <option value="BRL">BRL</option>
        <option value="BSD">BSD</option>
        <option value="CAD">CAD</option>
        <option value="CHF">CHF</option>
        <option value="CLP">CLP</option>
        <option value="CNY">CNY</option>
        <option value="COP">COP</option>
        <option value="CZK">CZK</option>
        <option value="DKK">DKK</option>
        <option value="DOP">DOP</option>
        <option value="EGP">EGP</option>
        <option value="EUR" selected>EUR</option>
        <option value="FJD">FJD</option>
        <option value="GBP">GBP</option>
        <option value="GTQ">GTQ</option>
        <option value="HKD">HKD</option>
        <option value="HRK">HRK</option>
        <option value="HUF">HUF</option>
        <option value="IDR">IDR</option>
        <option value="ILS">ILS</option>
        <option value="INR">INR</option>
        <option value="ISK">ISK</option>
        <option value="JPY">JPY</option>
        <option value="KRW">KRW</option>
        <option value="KZT">KZT</option>
        <option value="MXN">MXN</option>
        <option value="MYR">MYR</option>
        <option value="NOK">NOK</option>
        <option value="NZD">NZD</option>
        <option value="PAB">PAB</option>
        <option value="PEN">PEN</option>
        <option value="PHP">PHP</option>
        <option value="PKR">PKR</option>
        <option value="PLN">PLN</option>
        <option value="PYG">PYG</option>
        <option value="RUB">RUB</option>
        <option value="SAR">SAR</option>
        <option value="SEK">SEK</option>
        <option value="SGD">SGD</option>
        <option value="TRY">TRY</option>
        <option value="UAH">UAH</option>
        <option value="USD">USD</option>
        <option value="UYU">UYU</option>
        <option value="VND">VND</option>
        <option value="ZAR">ZAR</option>
        <option value=""></option>
        <option value=""></option>
      </select>
      <input type="number" id="amount-two" placeholder="0">
    </div>
  </div>
<style>


* {
  box-sizing: border-box;
}

:host {
  --primary-color: #7EBEA3;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  margin: 0;
  padding: 5px;
  border-radius: 5px;
}

h1 {
  color: var(--primary-color);
}

p {
  text-align: center;
}

.btn {
  color: #fff;
  background: var(--primary-color);
  cursor: pointer;
  border-radius: 5px;
  font-size: 12px;
  padding: 5px 12px;
}

.currency {
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.currency select {
  padding: 10px 20px 10px 10px;
  -webkit-appearance: none;
   -moz-appearance:    none;
   appearance:         none;
   border: 1px solid #dedede;
   border-radius: 5px;
   background: transparent;
   background-image: url('./img/arrow.png');
   background-position: right 10px top 50%, 0, 0;
   background-size: 12px auto, 100%;
   background-repeat: no-repeat;
}

.currency input {
  border: 0;
  background: transparent;
  font-size: 30px;
  text-align: center;

}

.swap-rate-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rate {
  color: var(--primary-color);
  font-size: 14px;
  padding: 0 10px;
}

select:focus, input:focus, button:focus {
  outline: 0;
}   
</style>
`

customElements.define('my-exchange',
  class extends HTMLElement {
    constructor() {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.getValue = this.getValue.bind(this)

      this.firstCurrency = this.shadowRoot.querySelector('#currency-one')
      this.secondCurrency = this.shadowRoot.querySelector('#currency-two')
      this.firstAmount = this.shadowRoot.querySelector('#amount-one')
      this.secondAmount = this.shadowRoot.querySelector('#amount-two')
      this.rateElement = this.shadowRoot.querySelector('#rate')
      this.swapBtn = this.shadowRoot.querySelector('#swap')
    }

    /**
     * Called when the custom element is inserted in the DOM.
     */
    connectedCallback () {
      this.firstCurrency.addEventListener('change', this.getValue)
      this.secondCurrency.addEventListener('change', this.getValue)
      this.firstAmount.addEventListener('input', this.getValue)
      this.secondAmount.addEventListener('input', this.getValue)
      this.swapBtn.addEventListener('click', () => {
        const temp = this.firstCurrency.value
        this.firstCurrency.value = this.secondCurrency.value

        this.secondCurrency.value = temp
        this.getValue()

      })
    }

    /**
     * Removes connectedCallback.
     */
    disconnectedCallback () {
      this.firstCurrency.removeEventListener('change', this.getValue)
      this.secondCurrency.removeEventListener('change', this.getValue)
      this.firstAmount.removeEventListener('input', this.getValue)
      this.secondAmount.removeEventListener('input', this.getValue)
    }

    /**
     * Exchange rate calculator.
     *
     */
    getValue () {
      const currencyOne = this.firstCurrency.value
      const currencyTwo = this.secondCurrency.value

      fetch(`https://v6.exchangerate-api.com/v6/5f2e68170c627c6983e0a6f4/latest/${currencyOne}`)
        .then(res => res.json())
        .then(data => {
          const rate = data.conversion_rates[currencyTwo]
          this.rateElement.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`
          this.secondAmount.value = (this.firstAmount.value * rate).toFixed(2)
        })
    }
  })
