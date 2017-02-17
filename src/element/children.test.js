const children = require('./children').default

describe('element.children', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="container">
        <span class="child"></span>
        <span class="child two"></span>
        <span class="child three"></span>
        <span class="four"></span>
      </div>
    `
  })

  it('should return a list of span elements', () => {
    const parent = document.querySelector('.container')
    const expectedChildren = 4
    expect(children(null, parent).length).toBe(expectedChildren)
  })

  it('should accept a selector and return a filtered list of span elements', () => {
    const parent = document.querySelector('.container')
    const expectedChildren = 3
    expect(children('.child', parent).length).toBe(expectedChildren)
  })

  it('should accept an element and return a filtered list of just that element if it is a child', () => {
    const parent = document.querySelector('.container')
    const third = document.querySelector('.three')
    const expectedChildren = 1
    expect(children(third, parent).length).toBe(expectedChildren)
  })

  it('should accept an element and return an empty list if the element is not a child', () => {
    const parent = document.querySelector('.container')
    const orphan = document.createElement('div')
    const expectedChildren = 0
    expect(children(orphan, parent).length).toBe(expectedChildren)
  })
})

