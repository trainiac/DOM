const fp = require('lodash/fp')
const next = require('./next').default

describe('elements.next', () => {
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

  it('should return all next elements', () => {
    const spans = fp.toArray(document.querySelectorAll('span:first-child'))
    const expectedNext = 2
    const elements = next(null, spans) // eslint-disable-line callback-return
    expect(elements).toHaveLength(expectedNext)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = next(null, []) // eslint-disable-line callback-return
    expect(elements).toHaveLength(0)
  })
})
