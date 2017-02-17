const fp = require('lodash/fp')
const has = require('./has').default

describe('elements.has', () => {
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

  it('should return elements that have a matched selector', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedCount = 2
    const filtered = has('span', containers)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return elements that have a matched selector', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const firstSpan = document.querySelector('span.child')
    const expectedCount = 1
    const filtered = has(firstSpan, containers)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return an empty list if nothing is passed', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedCount = 0
    const filtered = has(null, containers)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return an empty list if nothing is matched', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedCount = 0
    const filtered = has('.foo', containers)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = has(null, [])
    expect(elements).toHaveLength(0)
  })
})
