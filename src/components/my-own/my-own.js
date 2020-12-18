const template = document.createElement('template')
template.innerHTML = ` 
<div id="mycontainer">
<div id="textintro">
<h2>Här ska det va vara en massa text, lite presentation så folk fattar vad dom ska göra.</h2>

</div>
  <div id="buttoncontainer">
    <button id="getquote">FUNNY QUOTE</button>
    <button id="getmeanquote">MEAN QUOTE</button>
  </div>
</div>


<style>

  #mycontainer {
    text-align: center;



  }

  #getquote, #getmeanquote {
  padding: 25px 0px;
	border-radius: 10px;
	background-color: #7EBEA3;
  font-weight: 600;
  border: none;
  border-bottom: 4px solid #53A08E;
  color: white;
	font-size: larger;
  transition-duration: 0.4s;
  width:50%;
  margin-left:25%;
  margin-right:25%;
  margin-bottom: 20px;





  }

  #mycontainer {
    min-height: 600px;
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
