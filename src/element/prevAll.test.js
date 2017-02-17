const fp = require('lodash/fp')
const prevAll = require('./prevAll').default

describe('element.prevAll', () => {
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

  it('should get all the prev elements', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const paragraph = document.querySelector('p')
    const firstSpan = spans[0]
    const secondSpan = spans[1]
    const elements = prevAll(null, paragraph)
    const expectedPrevs = 2
    expect(elements.length).toBe(expectedPrevs)
    expect(elements[0]).toBe(firstSpan)
    expect(elements[1]).toBe(secondSpan)
  })

  it('should return an empty list if first sibling', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const firstSpan = spans[0]
    expect(prevAll(null, firstSpan)).toEqual([])
  })
})
