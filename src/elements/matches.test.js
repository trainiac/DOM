const fp = require('lodash/fp')
const matches = require('./matches').default

describe('elements.matches', () => {
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

  it('should return true for set that has a matched selector', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const isContainer = matches('.container', containers)
    expect(isContainer).toBe(true)
  })

  it('should return true for set that has a matched node', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const container = containers[0]
    const isContainer = matches(container, containers)
    expect(isContainer).toBe(true)
  })

  it('should return an empty list if nothing is matched', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const isContainer = matches('.foo', containers)
    expect(isContainer).toBe(false)
  })

  it('should return false if starting with empty list', () => {
    const elements = matches(null, [])
    expect(elements).toBe(false)
  })
})
