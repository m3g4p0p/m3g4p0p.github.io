import { ALBUMS } from './config.js'
import { ScrollHandler } from './scroll-handler.js'

/**
 * @type {HTMLElement}
 */
const main = document.querySelector('main')

/**
 * @type {HTMLTemplateElement}
 */
const playerTemplate = document.getElementById('player-template')

/**
 * @type {HTMLTemplateElement}
 */
const cardTemplate = document.getElementById('card-template')

/**
 * @param {object} album
 * @returns {DocumentFragment}
 */
function createPlayer (album) {
  const player = playerTemplate.content.cloneNode(true)
  const iframe = player.querySelector('iframe')
  const link = player.querySelector('a')

  iframe.src = iframe.src.replace(
    /(\w+)=\w+/g,
    (_, param) => `${param}=${album[param]}`
  )

  if (link) {
    link.href = album.link
    link.textContent = album.text
  }

  return player
}

/**
 * @param {object} album
 * @returns {DocumentFragment}
 */
function createCard (album) {
  const card = cardTemplate.content.cloneNode(true)
  const link = card.querySelector('a')
  const copy = card.querySelector('p')

  link.href = album.link
  link.textContent = album.text

  if (album.copy) {
    copy.textContent = album.copy
  } else {
    copy.remove()
  }

  return card
}

function populateContent () {
  ALBUMS.forEach(album => {
    const player = createPlayer(album)
    const card = createCard(album, player)
    const iframe = card.querySelector('iframe')

    iframe.replaceWith(player)
    main.appendChild(card)
  })
}

const scrollHandler = new ScrollHandler(() => {
  document.body.classList.toggle('scrolling')
}, 200)

scrollHandler.init()
populateContent()
