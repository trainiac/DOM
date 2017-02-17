const fp = require('lodash/fp')
const find = require('./find').default

describe('element.find', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="container">
        <span class="child"></span>
        <span class="child">
          <a href=/go>click</a>
        </span>
      </div>
    `
  })

  it('should be able to find a selector', () => {
    const parent = document.querySelector('.container')
    const spans = fp.toArray(document.querySelectorAll('.child'))
    const found = find('.child', parent)
    expect(found.length).toBe(spans.length)
    expect(found[0]).toBe(spans[0])
    expect(found[1]).toBe(spans[1])
  })

  it('should be able to find an element', () => {
    const parent = document.querySelector('.container')
    const anchor = document.querySelector('a')
    const found = find(anchor, parent)
    expect(found[0]).toBe(anchor)
  })

  it('should return an empty array if not found', () => {
    const parent = document.querySelector('.container')
    const found = find('p', parent)
    expect(found).toEqual([])
  })

  it('should return an empty array if no selection is passed', () => {
    const parent = document.querySelector('.container')
    const found = find(null, parent)
    expect(found).toEqual([])
  })
})


