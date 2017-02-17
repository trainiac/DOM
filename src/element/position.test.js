const position = require('./position').default

describe('element.position', () => {
  // jsdom does not implement layout
  it('should retrieve postioning', () => {
    const expectedPosition = {
      top: 7,
      left: 8,
      offsetParent: 1,
      offsetLeft: 2,
      offsetRight: 3,
      scrollTop: 4,
      scrollLeft: 5
    }

    const el = {
      offsetParent: 1,
      offsetLeft: 2,
      offsetRight: 3,
      scrollTop: 4,
      scrollLeft: 5,
      getBoundingClientRect () {
        return {
          top: 7,
          left: 8
        }
      }
    }

    expect(position(el)).toEqual(expectedPosition)
  })

  it('should return null if no element passed', () => {
    expect(position(null)).toBe(null)
  })
})
