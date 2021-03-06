const $m = require('./index').default

describe('$m', () => {
  it('should have all of the methods', () => {
    const methods = [
      'ancestors',
      'children',
      'closest',
      'data',
      'dimensions',
      'find',
      'filter',
      'has',
      'next',
      'nextAll',
      'position',
      'positionRelativeTo',
      'parents',
      'prev',
      'prevAll',
      'remove',
      'siblings',
      'handleIf',
      'select'
    ]

    methods.forEach(method => expect($m[method]).toBeTruthy())
  })
})
