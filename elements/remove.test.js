const fp = require('lodash/fp')
const remove = require('./remove').default

describe('elements.remove', () => {
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
          <span class="child orphan four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="container"></div>
      </div>
    `
  })

  it('should return elements that do not match selector', () => {
    const children = fp.toArray(document.querySelectorAll('.child'))
    const expectedCount = 7
    const filtered = remove('.orphan', children)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return elements that do not match a node', () => {
    const children = fp.toArray(document.querySelectorAll('.child'))
    const orphan = document.querySelector('.orphan')
    const expectedCount = 7
    const filtered = remove(orphan, children)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return the same list if nothing is passed', () => {
    const children = fp.toArray(document.querySelectorAll('.child'))
    const expectedCount = 8
    const filtered = remove(null, children)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return the same list if nothing is matched', () => {
    const children = fp.toArray(document.querySelectorAll('.child'))
    const expectedCount = 8
    const filtered = remove('.foo', children)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = remove(null, [])
    expect(elements).toHaveLength(0)
  })
})
