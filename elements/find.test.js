const fp = require('lodash/fp')
const find = require('./find').default

describe('elements.find', () => {
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

  it('should return all found elements', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedElements = 8
    const elements = find('a', containers)
    expect(elements).toHaveLength(expectedElements)
  })

  it('should return only descendants that matched the selector', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedElements = 7
    const elements = find('.child a', containers)
    expect(elements).toHaveLength(expectedElements)
  })

  it('should return only child that matched a node', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const orphan = document.querySelector('.orphan a')
    const expectedElements = 1
    const elements = find(orphan, containers)
    expect(elements).toHaveLength(expectedElements)
  })

  it('should return empty list if no descendants are found', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedElements = 0
    const elements = find('.foo', containers)
    expect(elements).toHaveLength(expectedElements)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = find(null, [])
    expect(elements).toHaveLength(0)
  })
})
