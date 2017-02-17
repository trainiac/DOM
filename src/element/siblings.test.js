const fp = require('lodash/fp')
const siblings = require('./siblings').default

describe('element.siblings', () => {
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

  it('should be able to get all siblings', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const paragraph = document.querySelector('p')
    const elements = siblings(null, paragraph)
    expect(elements.length).toBe(spans.length)
    expect(elements[0]).toBe(spans[0])
    expect(elements[1]).toBe(spans[1])
  })

  it('should be able to get all siblings with selector', () => {
    const firstSpan = fp.toArray(document.querySelectorAll('span'))[0]
    const paragraph = document.querySelector('p')
    const elements = siblings('p', firstSpan)
    expect(elements.length).toBe(1)
    expect(elements[0]).toBe(paragraph)
  })

  it('should be able to verify that an element is a sibling', () => {
    const firstSpan = fp.toArray(document.querySelectorAll('span'))[0]
    const paragraph = document.querySelector('p')
    const elements = siblings(paragraph, firstSpan)
    expect(elements.length).toBe(1)
    expect(elements[0]).toBe(paragraph)
  })
})
