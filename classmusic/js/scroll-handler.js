export class ScrollHandler {
  constructor (callback, delay = 0) {
    this.callback = callback
    this.delay = delay
    this.handle = null
  }

  init () {
    window.addEventListener('scroll', this)
  }

  destroy () {
    window.removeEventListener('scroll', this)
  }

  handleEvent (event) {
    if (this.handle) {
      window.clearTimeout(this.handle)
    } else {
      this.callback(event)
    }

    this.handle = window.setTimeout(() => {
      this.handle = null
      this.callback(null)
    }, this.delay)
  }
}