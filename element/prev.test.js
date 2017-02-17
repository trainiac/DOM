const fp = require('lodash/fp')
const prev = require('./prev').default

describe('element.prev', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="container">
        <span class="sibling first"></span>
        <span class="sibling second">
          <a href=/go>click</a>
        </span>
        <p class="sibling"></p>
      </div>
    `
  })

  it('should get prev element', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const firstSpan = spans[0]
    const secondSpan = spans[1]
    expect(prev(null, secondSpan)).toBe(firstSpan)
  })

  it('should get prev element that has class second', () => {
    const pTag = document.querySelector('p')
    const firstSpan = document.querySelector('span')
    expect(prev('.first', pTag)).toBe(firstSpan)
  })

  it('should return undefined if first sibling', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const firstSpan = spans[0]
    expect(prev(null, firstSpan)).toBe(null)
  })
})
