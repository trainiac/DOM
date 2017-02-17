const fp = require('lodash/fp')
const select = require('./select').default
const children = require('../elements/children').default
const closest = require('../elements/closest').default
const find = require('../elements/find').default

describe('helpers.select', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="container">
        <button>
          Click
          <span class="deadZone"></span>
        </button>
      </div>
    `
  })

  it('should accept css selector and scope element', () => {
    const elements = select(
      'button',
      document
    )
    expect(elements[0]).toBe(document.querySelector('button'))
  })

  it('should accept an element and null scope selector', () => {
    const container = document.querySelector('.container')

    const elements = select(
      container,
      null
    )

    expect(elements[0]).toBe(container)
  })

  it('should return an empty array if neither an element nor a string is passed', () => {
    const elements = select(
      [],
      null
    )

    expect(elements).toHaveLength(0)
  })

  it('should accept css selector and list of functions to act on the results', () => {
    const element = select(
      'button',
      document,
      children(null),
      closest('.container', document),
      fp.head
    )
    expect(element).toBe(document.querySelector('.container'))
  })

  it('should accept an element and list of functions to act on the results', () => {
    const element = select(
      document.querySelector('.container'),
      null,
      find('.deadZone'),
      fp.head
    )
    expect(element).toBe(document.querySelector('.deadZone'))
  })
})
