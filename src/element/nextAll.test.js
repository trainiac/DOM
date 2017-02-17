const fp = require('lodash/fp')
const nextAll = require('./nextAll').default

describe('element.nextAll', () => {
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

  it('should get all the next elements', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const paragraph = document.querySelector('p')
    const firstSpan = spans[0]
    const secondSpan = spans[1]
    const elements = nextAll(null, firstSpan)
    const expectedNexts = 2
    expect(elements.length).toBe(expectedNexts)
    expect(elements[0]).toBe(secondSpan)
    expect(elements[1]).toBe(paragraph)
  })

  it('should return an empty list if last sibling', () => {
    const paragraph = document.querySelector('p')
    expect(nextAll(null, paragraph)).toEqual([])
  })
})

