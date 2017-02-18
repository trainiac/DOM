
describe('flatten', () => {
  const flatten = require('./utils').flatten

  it('should leave non array values', () => {
    expect(flatten(['1', ['1', '2']])).toEqual(['1', '1', '2'])
  })
})

describe('findFrom', () => {
  const findFrom = require('./utils').findFrom
  it('should return undefined in nothing found', () => {
    expect(findFrom(item => item === '1', 1, ['1', '2', '3'])).toEqual(undefined)
  })
})

describe('findFromRight', () => {
  const findFromRight = require('./utils').findFromRight
  it('should return undefined in nothing found', () => {
    expect(findFromRight(item => item === '1', 1, ['3', '2', '1'])).toEqual(undefined)
  })
})
