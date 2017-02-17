const data = require('./data').default // eslint-disable-line id-blacklist

describe('element.data', () => {
  beforeAll(() => {
    document.body.innerHTML = '<div class="container" data-foo="bar"></div>'
  })

  // jsdom currently doesn't support dataset hence the mock
  it('should retrieve data from data attibutes', () => {
    expect(data(
      'foo', {
        dataset: {
          foo: 'bar'
        }
      }
    )).toBe('bar')
  })

  it('should return null if data key doesnt exist', () => {
    const container = document.querySelector('.container')
    expect(data('baz', container)).toBe(null)
  })
})
