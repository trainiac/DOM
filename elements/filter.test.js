const fp = require('lodash/fp')
const filter = require('./filter').default

describe('elements.filter', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <span class="child">
            <a href="#">Link</a>
          </span>
          <span class="child two">
            <a href="#">Link</a>
          </span>
          <span class="child three">
            <a href="#">Link</a>
          </span>
          <span class="child four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="container">
          <span class="child five">
            <a href="#">Link</a>
          </span>
          <span class="child six">
            <a href="#">Link</a>
          </span>
          <span class="child seven">
            <a href="#">Link</a>
          </span>
          <span class="orphan four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="container"></div>
      </div>
    `
  })

  it('should return elements that match selector', () => {
    const children = fp.toArray(document.querySelectorAll('span'))
    const expectedCount = 7
    const filtered = filter('.child', children)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return elements that match a node', () => {
    const children = fp.toArray(document.querySelectorAll('span'))
    const orphan = document.querySelector('.orphan')
    const expectedCount = 1
    const filtered = filter(orphan, children)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return the same list if nothing is passed', () => {
    const children = fp.toArray(document.querySelectorAll('span'))
    const expectedCount = 8
    const filtered = filter(null, children)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return an empty list if nothing is matched', () => {
    const children = fp.toArray(document.querySelectorAll('span'))
    const expectedCount = 0
    const filtered = filter('.foo', children)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = filter(null, [])
    expect(elements).toHaveLength(0)
  })
})
