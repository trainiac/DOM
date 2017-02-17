const positionRelativeTo = require('./positionRelativeTo').default

describe('element.positionRelativeTo', () => {
  // jsdom does not implement layout

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

  const otherEl = {
    offsetParent: 1,
    offsetLeft: 2,
    offsetRight: 3,
    scrollTop: 4,
    scrollLeft: 5,
    getBoundingClientRect () {
      return {
        top: 8,
        left: 9
      }
    }
  }

  it('should retrieve relative postioning', () => {
    const expectedPosition = {
      top: 1,
      left: 1
    }

    const position = positionRelativeTo(otherEl, el)
    expect(position).toEqual(expectedPosition)
  })

  it('should return null if no base element passed', () => {
    expect(positionRelativeTo(otherEl, null)).toBe(null)
  })

  it('should return null if no relative element passed', () => {
    expect(positionRelativeTo(null, el)).toBe(null)
  })
})
