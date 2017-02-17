const fp = require('lodash/fp')
const children = require('./children').default

describe('elements.children', () => {
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
          <span class="orphan four"></span>
        </div>
        <div class="container">
        </div>
      </div>
    `
  })

  it('should return all children', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedChildren = 8
    const elements = children(null, containers)
    expect(elements).toHaveLength(expectedChildren)
  })

  it('should return only children that matched the selector', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedChildren = 7
    const elements = children('.child', containers)
    expect(elements).toHaveLength(expectedChildren)
  })

  it('should return only child that matched a node', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const orphan = document.querySelector('.orphan')
    const expectedChildren = 1
    const elements = children(orphan, containers)
    expect(elements).toHaveLength(expectedChildren)
  })

  it('should return empty list if no children are found', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedChildren = 0
    const elements = children('.foo', containers)
    expect(elements).toHaveLength(expectedChildren)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = children(null, [])
    expect(elements).toHaveLength(0)
  })
})
