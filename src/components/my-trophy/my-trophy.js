// code src = https://codepen.io/Pomcer/details/yvrBeP

const template = document.createElement('template')
template.innerHTML = ` 

  <div class='wrapper'>
    <div class='glow'></div>
    <div class='mask'>
      <div class='container'>
        <div class='star'>&#10022;</div>
        <div class='main'></div>
        <div class='stem1'></div>
        <div class='stemCrease'></div>
        <div class='stem2'></div>
        <div class='base'></div>
        <div class='arms'></div>
      </div>
    </div>
  </div>

<style>



.wrapper {
  min-width: 500px;
  min-height: 500px;
  margin: none;
  /* background: black; */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .glow {
  position: absolute;
  width: 0px;
  height: 0px;
  background: transparent;
  border-radius: 200px;
  box-shadow: 0px 0px 400px 200px white;
  animation: shadow 6s linear infinite;
} */
.mask {
  margin: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background: gainsboro;
  animation-fill-mode: forwards; */
  z-index: 100;
  /* animation: leftToRight 6s linear; */
}

.container {
  position: absolute;
  top: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: rotate 1s linear alternate infinite;
  transform: rotate(-10deg);
}

.main {
  height: 250px;
  width: 200px;
  background: gold;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;
}

.stem2 {
  position: fixed;
  top: 190px;
	border-bottom: 100px solid gold;
	border-left: 50px solid transparent;
	border-right: 50px solid transparent;
	height: 0px;
	width: 40px;
  border-bottom-left-radius: 200px;
  border-bottom-right-radius: 200px;
  transform: rotate(180deg);
}
.stem1 {
  position: absolute;
  top: 280px;
	border-bottom: 100px solid gold;
	border-left: 50px solid transparent;
	border-right: 50px solid transparent;
	height: 0;
	width: 40px;
  border-top-left-radius: 200px;
  border-top-right-radius: 200px;
}
.base {
  position: fixed;
  width: 180px;
  border-top-left-radius: 200px;
  border-top-right-radius: 200px;
  background: black;
  height: 20px;
  top: 380px;
}
.arms {
  width: 300px;
  height: 150px;
  position: absolute;
  background: transparent;
  z-index: -1;
  border: #ddba00 20px solid;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;

}
.stemCrease {
  position: absolute;
  width: 60px;
  height: 15px;
  border-radius: 10px;
  background: #ddba00;
  top: 280px;
  z-index: 1;
}
.star {
  position: absolute;
  font-size: 100px;
  color: white;
  top: 0px;
  left: 100px;
  transform-origin: center;
  animation: shimmer .4s alternate infinite linear;
}

@keyframes shimmer {
  to{transform: rotate(20deg)}
}
@keyframes rotate {
  to{transform: rotate(10deg)}
}
@keyframes leftToRight{
  0% {clip-path: circle(150px at 0% 100%);}
  20% {clip-path: circle(150px at 50% 15%);}
  30% {clip-path: circle(150px at 100% 50%);}
  40% {clip-path: circle(150px at 70% 100%);}
  70% {clip-path: circle(150px at -100% -100%);}
  80% {clip-path: circle(150px at -100% 200%);}
  85% {clip-path: circle(150px at 50% 200%);}
  90% {clip-path: circle(100% at 50% 80%);}
}
@keyframes shadow {
  0% {
    left: 0%;
    top: 100%;
  }
  20% {
    left: 50%;
    top: 15%;
  }
  30% {
    left: 100%;
    top: 50%;
  }
  40% {
    left: 70%;
    top: 100%;
  }
  70% {
    left: -100%;
    top: -100%;
  }
  80% {
    left: -100%;
    top: 200%
  }
  85% {
    left: 500%;
    top: 200%;
  }
  95% {
    left: 50%;
    top: 80%;
  }
  
}

</style>
`

customElements.define('my-trophy',
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
