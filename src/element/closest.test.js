const closest = require('./closest').default

describe('element.closest', () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <div class="foo">
      <div class="container">
        <span class="sibling"></span>
        <span class="sibling second">
          <a href=/go>click</a>
        </span>
        <p class="sibling"></p>
      </div>
    </div>
    `
  })

  it('should find the closest and ancestor that matches a selector', () => {
    const anchor = document.querySelector('a')
    const container = document.querySelector('.container')
    const element = closest('.container', null, anchor)
    expect(element).toBe(container)
  })

  it('should find the closest and ancestor that matches a node', () => {
    const anchor = document.querySelector('a')
    const container = document.querySelector('.container')
    const element = closest(container, null, anchor)
    expect(element).toBe(container)
  })

  it('should not find an ancestor outside of a scope element', () => {
    const anchor = document.querySelector('a')
    const container = document.querySelector('.container')
    const foo = document.querySelector('.foo')
    const closestFoo = closest('.foo', null, anchor)
    expect(closestFoo).toBe(foo)
    const element = closest('.foo', container, anchor)
    expect(element).toBe(null)
  })
})
