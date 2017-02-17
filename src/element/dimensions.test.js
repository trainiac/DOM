const dimensions = require('./dimensions').default

describe('element.dimensions', () => {
  // jsdom does not implement layout

  it('should retrieve dimensions', () => {
    const expectedDimensions = {
      innerWidth: 1,
      innerHeight: 2,
      scrollWidth: 3,
      scrollHeight: 4,
      nonTransformHeight: 5,
      nonTransformWidth: 6,
      height: 7,
      width: 8
    }
    const el = {
      clientWidth: 1,
      clientHeight: 2,
      scrollWidth: 3,
      scrollHeight: 4,
      offsetHeight: 5,
      offsetWidth: 6,
      getBoundingClientRect () {
        return {
          height: 7,
          width: 8
        }
      }
    }

    expect(dimensions(el)).toEqual(expectedDimensions)
  })

  it('should return null if no element passed', () => {
    expect(dimensions(null)).toBe(null)
  })
})
