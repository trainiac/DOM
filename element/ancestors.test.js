const ancestors = require('./ancestors').default

describe('element.ancestors', () => {
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

  it('should find all ancestors', () => {
    const anchor = document.querySelector('a')
    const foo = document.querySelector('.foo')
    const container = document.querySelector('.container')
    const secondSpan = document.querySelectorAll('span')[1]
    const elements = ancestors(null, foo, anchor)
    const expectedAncestors = 3

    expect(elements).toContain(secondSpan)
    expect(elements).toContain(container)
    expect(elements).toContain(foo)
    expect(elements).toHaveLength(expectedAncestors)
  })

  it('should find all ancestors that match a selector', () => {
    const anchor = document.querySelector('a')
    const foo = document.querySelector('.foo')
    const container = document.querySelector('.container')
    const elements = ancestors('div', foo, anchor)
    const expectedAncestors = 2

    expect(elements).toContain(container)
    expect(elements).toContain(foo)
    expect(elements).toHaveLength(expectedAncestors)
  })

  it('should find all ancestors that match a node', () => {
    const anchor = document.querySelector('a')
    const container = document.querySelector('.container')
    const elements = ancestors(container, null, anchor)
    const expectedAncestors = 1

    expect(elements).toContain(container)
    expect(elements).toHaveLength(expectedAncestors)
  })

  it('should find all ancestors without scope', () => {
    const anchor = document.querySelector('a')
    const foo = document.querySelector('.foo')
    const secondSpan = document.querySelectorAll('span')[1]
    const container = document.querySelector('.container')
    const elements = ancestors(null, null, anchor)
    const expectedAncestors = 5

    expect(elements).toContain(secondSpan)
    expect(elements).toContain(container)
    expect(elements).toContain(foo)
    expect(elements).toContain(document.body)
    expect(elements).toContain(document.documentElement)
    expect(elements).toHaveLength(expectedAncestors)
  })

  it('should return an empty list when no ancestors are matched', () => {
    const anchor = document.querySelector('a')
    const elements = ancestors('header', null, anchor)
    const expectedAncestors = 0
    expect(elements).toHaveLength(expectedAncestors)
  })
})
