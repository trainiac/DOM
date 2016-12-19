import DOM, { onlyIf } from './index'

describe('DOM', () => {
  it('should accept a node', () => {
    const div = document.createElement('div')
    expect(DOM(div).element()).toBe(div)
  })
})


describe('onlyIf', () => {
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

  it('should invoke the callback if the selector is matched', () => {
    const handler = jest.fn()
    const event = {
      currentTarget: document.querySelector('.container'),
      target: document.querySelector('button')
    }

    const scopedHandler = onlyIf('button', handler)

    scopedHandler(event)
    expect(handler).toHaveBeenCalledWith(event, event.target)
  })

  it('should invoke the callback if descendant of selector is matched', () => {
    const handler = jest.fn()
    const event = {
      currentTarget: document.querySelector('.container'),
      target: document.querySelector('.deadZone')
    }

    const scopedHandler = onlyIf('button', handler)

    scopedHandler(event)
    expect(handler).toHaveBeenCalledWith(event, document.querySelector('button'))
  })

  it('should not invoke the callback if target is descendant of excluded selector', () => {
    const handler = jest.fn()
    const event = {
      currentTarget: document.querySelector('.container'),
      target: document.querySelector('.deadZone')
    }

    const scopedHandler = onlyIf('button', handler, { not: '.deadZone' })

    scopedHandler(event)
    expect(handler).toHaveBeenCalledTimes(0)
  })

  it('should not invoke the callback if selector is not matched', () => {
    const handler = jest.fn()
    const event = {
      currentTarget: document.querySelector('.container'),
      target: document.querySelector('button')
    }

    const scopedHandler = onlyIf('.foo', handler)

    scopedHandler(event)
    expect(handler).toHaveBeenCalledTimes(0)
  })
})
