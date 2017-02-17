const fp = require('lodash/fp')
const parents = require('./parents').default

describe('elements.parents', () => {
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

  it('should return all parents', () => {
    const children = fp.toArray(document.querySelectorAll('a'))
    const expectedParents = 8
    const elements = parents(null, children)
    expect(elements).toHaveLength(expectedParents)
  })

  it('should return all parents that match a selector', () => {
    const children = fp.toArray(document.querySelectorAll('a'))
    const expectedParents = 7
    const elements = parents('.child', children)
    expect(elements).toHaveLength(expectedParents)
  })

  it('should return parent that matched a node', () => {
    const children = fp.toArray(document.querySelectorAll('a'))
    const orphan = document.querySelector('.orphan')
    const expectedParents = 1
    const elements = parents(orphan, children)
    expect(elements).toHaveLength(expectedParents)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = parents(null, [])
    expect(elements).toHaveLength(0)
  })
})
