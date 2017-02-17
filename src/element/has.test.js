const has = require('./has').default

describe('element.has', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="container">
        <span class="sibling"></span>
        <span class="sibling second">
          <a href=/go>click</a>
        </span>
        <p class="sibling"></p>
      </div>
    `
  })

  it('should return false if nothing is passed as a selection', () => {
    expect(
      has(null, document.querySelector('div'))
    ).toBe(false)
  })

  it('should return true if selector is within element child tree', () => {
    expect(
      has('a', document.querySelector('.container'))
    ).toBe(true)
  })

  it('should return true if node is within element child tree', () => {
    const anchor = document.querySelector('a')
    expect(
      has(anchor, document.querySelector('.container'))
    ).toBe(true)
  })
})
