const fp = require('lodash/fp')
const ancestors = require('./ancestors').default

describe('elements.ancestors', () => {
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

  it('should return all ancestors', () => {
    const anchors = fp.toArray(document.querySelectorAll('a'))
    const spans = 8
    const containers = 2
    const wrapper = 1
    const body = 1
    const html = 1
    const expectedAncestors = spans + containers + wrapper + body + html
    const elements = ancestors(null, document, anchors)
    expect(elements).toHaveLength(expectedAncestors)
  })

  it('should return all ancestors that match a selector', () => {
    const anchors = fp.toArray(document.querySelectorAll('a'))
    const expectedAncestors = 2
    const elements = ancestors('.container', document, anchors)
    expect(elements).toHaveLength(expectedAncestors)
  })

  it('should return ancestor that matches a node', () => {
    const anchors = fp.toArray(document.querySelectorAll('a'))
    const firstContainer = document.querySelector('.container')
    const expectedAncestors = 1
    const elements = ancestors(firstContainer, document, anchors)
    expect(elements).toHaveLength(expectedAncestors)
  })

  it('should return an empty list of nothing matches', () => {
    const anchors = fp.toArray(document.querySelectorAll('a'))
    const expectedAncestors = 0
    const elements = ancestors('.foo', document, anchors)
    expect(elements).toHaveLength(expectedAncestors)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = ancestors(null, document, [])
    expect(elements).toHaveLength(0)
  })
})
