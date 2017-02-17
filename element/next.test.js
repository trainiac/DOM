const fp = require('lodash/fp')
const next = require('./next').default

describe('element.next', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="container">
        <span class="sibling"></span>
        <span class="sibling second">
          <a href=/go>click</a>
        </span>
        <p class="sibling"></p>
      </div>
    `
  })

  it('should get the next element', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const firstSpan = spans[0]
    const secondSpan = spans[1]
    expect(next(null, firstSpan)).toBe(secondSpan) // eslint-disable-line callback-return
  })

  it('should get the next element that is a p', () => {
    const span = document.querySelector('span')
    expect(next('p', span)).toBe(document.querySelector('p')) // eslint-disable-line callback-return
  })

  it('should return null if last sibling', () => {
    const paragraph = document.querySelector('p')
    expect(next(null, paragraph)).toBe(null) // eslint-disable-line callback-return
  })
})

