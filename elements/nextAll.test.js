const fp = require('lodash/fp')
const nextAll = require('./nextAll').default

describe('elements.nextAll', () => {
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
          <span class="orphan eight"></span>
        </div>
        <div class="container">
          <span class="child nine"></span>
        </div>
      </div>
    `
  })

  it('should return all following sibling elements', () => {
    const spans = fp.toArray(document.querySelectorAll('span:first-child'))
    const expectedNextAll = 6
    const elements = nextAll(null, spans)
    expect(elements).toHaveLength(expectedNextAll)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = nextAll(null, [])
    expect(elements).toHaveLength(0)
  })
})
