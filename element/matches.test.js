const matches = require('./matches').default

describe('element.matches', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="container">
      </div>
    `
  })

  it('should not match if selection is not a dom node or selector', () => {
    expect(matches(null, document.createElement('div'))).toBe(false)
  })

  it('should match if selection is the same dom node', () => {
    const div = document.createElement('div')
    expect(matches(div, div)).toBe(true)
  })

  it('should match if selection is a selector', () => {
    const div = document.querySelector('.container')
    expect(matches('.container', div)).toBe(true)
  })

  it('should match if selection is a selector', () => {
    const div = document.querySelector('.container')
    const div2 = document.createElement('div')
    expect(matches('.container', div)).toBe(true)
    expect(matches('div', div2)).toBe(true)
  })

  it('should work in different browsers', () => {
    const div = document.querySelector('.container')
    div.webkitMatchesSelector = div.matches
    div.matches = null
    expect(matches('.container', div)).toBe(true)
    div.mozMatchesSelector = div.webkitMatchesSelector
    div.webkitMatchesSelector = null
    expect(matches('.container', div)).toBe(true)
    div.msMatchesSelector = div.mozMatchesSelector
    div.mozMatchesSelector = null
    expect(matches('.container', div)).toBe(true)
  })
})
