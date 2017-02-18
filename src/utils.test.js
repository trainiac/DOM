const flatten = require('./utils').flatten

describe('flatten', () => {
  it('should leave non array values', () => {

    expect(flatten([1, [1 , 2]])).toEqual([1,1,2])

  })
})
