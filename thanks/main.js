const MAX_DELTA = 1
const headline = document.getElementById('headline')
const shadow = window.getComputedStyle(headline).getPropertyValue('text-shadow')
const matchPxs = /\d+(?=px)/g
const pxs = shadow.match(matchPxs)

function animate () {
  const altered = pxs.map(Number).map(value => value + (Math.random() * MAX_DELTA * 2 - MAX_DELTA))
  let i = 0
  headline.style.textShadow = shadow.replace(matchPxs, () => altered[i++])
  window.requestAnimationFrame(animate)
}

animate()