const fp = require('lodash/fp')
const siblings = require('./siblings').default

describe('elements.siblings', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <span class="child"></span>
          <span class="child two"></span>
          <span class="child three"></span>
          <span class="child four"></span>
        </div>
        <div class="container">
          <span class="child five"></span>
          <span class="child six"></span>
          <span class="child seven"></span>
          <span class="orphan eight"></span>
        </div>
        <div class="container">
          <span class="child nine"></span>
        </div>
      </div>
    `
  })

  it('should return all found siblings', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const expectedSiblings = 8
    const elements = siblings(null, spans)
    expect(elements).toHaveLength(expectedSiblings)
  })

  it('should return only siblings that matched the selector', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const expectedSiblings = 1
    const elements = siblings('.orphan', spans)
    expect(elements).toHaveLength(expectedSiblings)
  })

  it('should return only child that matched a node', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const orphan = document.querySelector('.orphan')
    const expectedSiblings = 1
    const elements = siblings(orphan, spans)
    expect(elements).toHaveLength(expectedSiblings)
  })

  it('should return empty list if no siblings are found', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const expectedSiblings = 0
    const elements = siblings('.foo', spans)
    expect(elements).toHaveLength(expectedSiblings)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = siblings(null, [])
    expect(elements).toHaveLength(0)
  })
})
