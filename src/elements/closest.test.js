const fp = require('lodash/fp')
const closest = require('./closest').default

describe('elements.closest', () => {
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
        <div class="child">
          <span class="grandchild"></span>
        </div>
      </div>
    `
  })

  it('should return all closest that match a selector', () => {
    const children = fp.toArray(document.querySelectorAll('.child'))
    const expectedClosest = 2
    const closests = closest('.container', document, children)
    expect(closests).toHaveLength(expectedClosest)
  })

  it('should return only closest that matched a node', () => {
    const children = fp.toArray(document.querySelectorAll('.child'))
    const firstContainer = document.querySelector('.container')
    const expectedClosest = 1
    const closests = closest(firstContainer, document, children)
    expect(closests).toHaveLength(expectedClosest)
  })

  it('should return emply list if no selector passed', () => {
    const children = fp.toArray(document.querySelectorAll('.child'))
    const expectedClosest = 0
    const closests = closest(null, document, children)
    expect(closests).toHaveLength(expectedClosest)
  })

  it('should return empty list if ancestor outside of scope', () => {
    const grandchild = fp.toArray(document.querySelectorAll('.grandchild'))
    const divChild = document.querySelector('div.child')
    const expectedClosestWhenNoScope = 1
    const closestWrapper = closest('.wrapper', document, grandchild)
    expect(closestWrapper).toHaveLength(expectedClosestWhenNoScope)
    const closestEmpty = closest('.wrapper', divChild, grandchild)
    expect(closestEmpty).toHaveLength(0)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = closest(null, document, [])
    expect(elements).toHaveLength(0)
  })
})
