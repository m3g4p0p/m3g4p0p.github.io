const MAX_DELTA = 1
const GLITCH_THRESH = .02
const container = document.getElementById('container')
const headline = document.getElementById('headline')
const opacity = window.getComputedStyle(container, '::before').getPropertyValue('opacity')
const shadow = window.getComputedStyle(headline).getPropertyValue('text-shadow')
const matchPxs = /\d+(?=px)/g
const pxs = shadow.match(matchPxs)

function animate () {
  const altered = pxs.map(Number).map(value => value + Math.round(Math.random() * MAX_DELTA * 2 - MAX_DELTA, 10))
  const glitch = Math.random()
  let i = 0

  headline.style.textShadow = shadow.replace(matchPxs, () => altered[i++])
  container.style.setProperty('--background-opacity', glitch <= GLITCH_THRESH ? .5 : opacity)
  window.requestAnimationFrame(animate)
}

animate()