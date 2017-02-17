const fp = require('lodash/fp')
const prev = require('./prev').default

describe('elements.prev', () => {
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

  it('should return all prev elements', () => {
    const spans = fp.toArray(document.querySelectorAll('span:last-child'))
    const expectedPrev = 2
    const elements = prev(null, spans)
    expect(elements).toHaveLength(expectedPrev)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = prev(null, [])
    expect(elements).toHaveLength(0)
  })
})
