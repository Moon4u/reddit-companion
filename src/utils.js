function msgJSON(request) {
  window.top.postMessage(JSON.stringify(request), "*")
}

function fitHeight() {
  var bar = document.getElementById('bar')
  msgJSON({action:'height', height:bar.clientHeight})
  bar.style.width = '100%'
}

function getRandomInt(min, max) {
  // via https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Math/random#Examples
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomChoice(items) {
  return items[getRandomInt(0, items.length-1)]
}

function addClass(el, klass) {
  el.classList.add(klass)
}

function removeClass(el, klass) {
  el.classList.remove(klass)
}
