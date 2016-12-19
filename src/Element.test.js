import fp from 'lodash/fp'
const Element = require('./Element') // jest can't do import * as Element from './elememt'


const getElement = () => document.createElement('div')

describe('Element.matches', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="container">
      </div>
    `
  })

  it('should not match if selection is not a dom node or selector', () => {
    expect(Element.matches(null, getElement())).toBe(false)
  })

  it('should match if selection is the same dom node', () => {
    const div = getElement()
    expect(Element.matches(div, div)).toBe(true)
  })

  it('should match if selection is a selector', () => {
    const div = document.querySelector('.container')
    expect(Element.matches('.container', div)).toBe(true)
  })

  it('should match if selection is a selector', () => {
    const div = document.querySelector('.container')
    const div2 = getElement()
    expect(Element.matches('.container', div)).toBe(true)
    expect(Element.matches('div', div2)).toBe(true)
  })

  it('should work in different browsers', () => {
    const div = document.querySelector('.container')
    div.webkitMatchesSelector = div.matches
    div.matches = null
    expect(Element.matches('.container', div)).toBe(true)
    div.mozMatchesSelector = div.webkitMatchesSelector
    div.webkitMatchesSelector = null
    expect(Element.matches('.container', div)).toBe(true)
    div.msMatchesSelector = div.mozMatchesSelector
    div.mozMatchesSelector = null
    expect(Element.matches('.container', div)).toBe(true)
  })
})

describe('Element.children', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="container">
        <span class="child"></span>
        <span class="child two"></span>
        <span class="child three"></span>
        <span class="four"></span>
      </div>
    `
  })

  it('should return a list of span elements', () => {
    const parent = document.querySelector('.container')
    const expectedChildren = 4
    expect(Element.children(null, parent).length).toBe(expectedChildren)
  })

  it('should accept a selector and return a filtered list of span elements', () => {
    const parent = document.querySelector('.container')
    const expectedChildren = 3
    expect(Element.children('.child', parent).length).toBe(expectedChildren)
  })

  it('should accept an element and return a filtered list of just that element if it is a child', () => {
    const parent = document.querySelector('.container')
    const third = document.querySelector('.three')
    const expectedChildren = 1
    expect(Element.children(third, parent).length).toBe(expectedChildren)
  })

  it('should accept an element and return an empty list if the element is not a child', () => {
    const parent = document.querySelector('.container')
    const orphan = getElement()
    const expectedChildren = 0
    expect(Element.children(orphan, parent).length).toBe(expectedChildren)
  })
})

describe('Element.find', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="container">
        <span class="child"></span>
        <span class="child">
          <a href=/go>click</a>
        </span>
      </div>
    `
  })

  it('should be able to find a selector', () => {
    const parent = document.querySelector('.container')
    const spans = fp.toArray(document.querySelectorAll('.child'))
    const found = Element.find('.child', parent)
    expect(found.length).toBe(spans.length)
    expect(found[0]).toBe(spans[0])
    expect(found[1]).toBe(spans[1])
  })

  it('should be able to find an element', () => {
    const parent = document.querySelector('.container')
    const anchor = document.querySelector('a')
    const found = Element.find(anchor, parent)
    expect(found[0]).toBe(anchor)
  })

  it('should return an empty array if not found', () => {
    const parent = document.querySelector('.container')
    const found = Element.find('p', parent)
    expect(found).toEqual([])
  })

  it('should return an empty array if no selection is passed', () => {
    const parent = document.querySelector('.container')
    const found = Element.find(null, parent)
    expect(found).toEqual([])
  })
})

describe('Element.siblings', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="container">
        <span class="sibling"></span>
        <span class="sibling second">
          <a href=/go>click</a>
        </span>
        <p class="sibling"></p>
      </div>
    `
  })

  it('should be able to get all siblings', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const paragraph = document.querySelector('p')
    const siblings = Element.siblings(null, paragraph)
    expect(siblings.length).toBe(spans.length)
    expect(siblings[0]).toBe(spans[0])
    expect(siblings[1]).toBe(spans[1])
  })

  it('should be able to get all siblings with selector', () => {
    const firstSpan = fp.toArray(document.querySelectorAll('span'))[0]
    const paragraph = document.querySelector('p')
    const siblings = Element.siblings('p', firstSpan)
    expect(siblings.length).toBe(1)
    expect(siblings[0]).toBe(paragraph)
  })

  it('should be able to verify that an element is a sibling', () => {
    const firstSpan = fp.toArray(document.querySelectorAll('span'))[0]
    const paragraph = document.querySelector('p')
    const siblings = Element.siblings(paragraph, firstSpan)
    expect(siblings.length).toBe(1)
    expect(siblings[0]).toBe(paragraph)
  })
})


describe('Element.next', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="container">
        <span class="sibling"></span>
        <span class="sibling second">
          <a href=/go>click</a>
        </span>
        <p class="sibling"></p>
      </div>
    `
  })

  it('should get the next element', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const firstSpan = spans[0]
    const secondSpan = spans[1]
    expect(Element.next(firstSpan)).toBe(secondSpan)
  })

  it('should return null if last sibling', () => {
    const paragraph = document.querySelector('p')
    expect(Element.next(paragraph)).toBe(null)
  })
})

describe('Element.nextAll', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="container">
        <span class="sibling"></span>
        <span class="sibling second">
          <a href=/go>click</a>
        </span>
        <p class="sibling"></p>
      </div>
    `
  })

  it('should get all the next elements', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const paragraph = document.querySelector('p')
    const firstSpan = spans[0]
    const secondSpan = spans[1]
    const nextAll = Element.nextAll(firstSpan)
    const expectedNexts = 2
    expect(nextAll.length).toBe(expectedNexts)
    expect(nextAll[0]).toBe(secondSpan)
    expect(nextAll[1]).toBe(paragraph)
  })

  it('should return an empty list if last sibling', () => {
    const paragraph = document.querySelector('p')
    expect(Element.nextAll(paragraph)).toEqual([])
  })
})

describe('Element.prev', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="container">
        <span class="sibling"></span>
        <span class="sibling second">
          <a href=/go>click</a>
        </span>
        <p class="sibling"></p>
      </div>
    `
  })

  it('should get prev element', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const firstSpan = spans[0]
    const secondSpan = spans[1]
    expect(Element.prev(secondSpan)).toBe(firstSpan)
  })

  it('should return undefined if first sibling', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const firstSpan = spans[0]
    expect(Element.prev(firstSpan)).toBe(null)
  })
})

describe('Element.prevAll', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="container">
        <span class="sibling"></span>
        <span class="sibling second">
          <a href=/go>click</a>
        </span>
        <p class="sibling"></p>
      </div>
    `
  })

  it('should get all the prev elements', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const paragraph = document.querySelector('p')
    const firstSpan = spans[0]
    const secondSpan = spans[1]
    const prevAll = Element.prevAll(paragraph)
    const expectedPrevs = 2
    expect(prevAll.length).toBe(expectedPrevs)
    expect(prevAll[0]).toBe(firstSpan)
    expect(prevAll[1]).toBe(secondSpan)
  })

  it('should return an empty list if first sibling', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const firstSpan = spans[0]
    expect(Element.prevAll(firstSpan)).toEqual([])
  })
})

describe('Element.closest', () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <div class="foo">
      <div class="container">
        <span class="sibling"></span>
        <span class="sibling second">
          <a href=/go>click</a>
        </span>
        <p class="sibling"></p>
      </div>
    </div>
    `
  })

  it('should find the closest and ancestor that matches a selector', () => {
    const anchor = document.querySelector('a')
    const container = document.querySelector('.container')
    const closest = Element.closest('.container', null, anchor)
    expect(closest).toBe(container)
  })

  it('should find the closest and ancestor that matches a node', () => {
    const anchor = document.querySelector('a')
    const container = document.querySelector('.container')
    const closest = Element.closest(container, null, anchor)
    expect(closest).toBe(container)
  })

  it('should not find an ancestor outside of a scope element', () => {
    const anchor = document.querySelector('a')
    const container = document.querySelector('.container')
    const foo = document.querySelector('.foo')
    const closestFoo = Element.closest('.foo', null, anchor)
    expect(closestFoo).toBe(foo)
    const closest = Element.closest('.foo', container, anchor)
    expect(closest).toBe(null)
  })
})

describe('Element.ancestors', () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <div class="foo">
      <div class="container">
        <span class="sibling"></span>
        <span class="sibling second">
          <a href=/go>click</a>
        </span>
        <p class="sibling"></p>
      </div>
    </div>
    `
  })

  it('should find all ancestors', () => {
    const anchor = document.querySelector('a')
    const foo = document.querySelector('.foo')
    const container = document.querySelector('.container')
    const secondSpan = document.querySelectorAll('span')[1]
    const ancestors = Element.ancestors(null, foo, anchor)
    const expectedAncestors = 3

    expect(ancestors).toContain(secondSpan)
    expect(ancestors).toContain(container)
    expect(ancestors).toContain(foo)
    expect(ancestors).toHaveLength(expectedAncestors)
  })

  it('should find all ancestors that match a selector', () => {
    const anchor = document.querySelector('a')
    const foo = document.querySelector('.foo')
    const container = document.querySelector('.container')
    const ancestors = Element.ancestors('div', foo, anchor)
    const expectedAncestors = 2

    expect(ancestors).toContain(container)
    expect(ancestors).toContain(foo)
    expect(ancestors).toHaveLength(expectedAncestors)
  })

  it('should find all ancestors that match a node', () => {
    const anchor = document.querySelector('a')
    const container = document.querySelector('.container')
    const ancestors = Element.ancestors(container, null, anchor)
    const expectedAncestors = 1

    expect(ancestors).toContain(container)
    expect(ancestors).toHaveLength(expectedAncestors)
  })

  it('should find all ancestors without scope', () => {
    const anchor = document.querySelector('a')
    const foo = document.querySelector('.foo')
    const secondSpan = document.querySelectorAll('span')[1]
    const container = document.querySelector('.container')
    const ancestors = Element.ancestors(null, null, anchor)
    const expectedAncestors = 5

    expect(ancestors).toContain(secondSpan)
    expect(ancestors).toContain(container)
    expect(ancestors).toContain(foo)
    expect(ancestors).toContain(document.body)
    expect(ancestors).toContain(document.documentElement)
    expect(ancestors).toHaveLength(expectedAncestors)
  })

  it('should return an empty list when no ancestors are matched', () => {
    const anchor = document.querySelector('a')
    const ancestors = Element.ancestors('header', null, anchor)
    const expectedAncestors = 0
    expect(ancestors).toHaveLength(expectedAncestors)
  })
})

describe('Element.has', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="container">
        <span class="sibling"></span>
        <span class="sibling second">
          <a href=/go>click</a>
        </span>
        <p class="sibling"></p>
      </div>
    `
  })

  it('should return false if nothing is passed as a selection', () => {
    expect(
      Element.has(null, document.querySelector('div'))
    ).toBe(false)
  })

  it('should return true if selector is within element child tree', () => {
    expect(
      Element.has('a', document.querySelector('.container'))
    ).toBe(true)
  })

  it('should return true if node is within element child tree', () => {
    const anchor = document.querySelector('a')
    expect(
      Element.has(anchor, document.querySelector('.container'))
    ).toBe(true)
  })
})

describe('Element.data', () => {
  beforeAll(() => {
    document.body.innerHTML = '<div class="container" data-foo="bar"></div>'
  })

  // jsdom currently doesn't support dataset hence the mock
  it('should retrieve data from data attibutes', () => {
    expect(Element.data({ dataset: { foo: 'bar' } }, 'foo')).toBe('bar')
  })

  it('should return null if data key doesnt exist', () => {
    const container = document.querySelector('.container')
    expect(Element.data(container, 'baz')).toBe(null)
  })
})

describe('Element.dimensions', () => {
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
      getBoundingClientRect(){
        return {
          height: 7,
          width: 8
        }
      }
    }

    const dimensions = Element.dimensions(el)
    expect(dimensions).toEqual(expectedDimensions)
  })

  it('should return null if no element passed', () => {
    expect(Element.dimensions(null)).toBe(null)
  })
})

describe('Element.position', () => {
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
      getBoundingClientRect(){
        return {
          top: 7,
          left: 8
        }
      }
    }

    const position = Element.position(el)
    expect(position).toEqual(expectedPosition)
  })

  it('should return null if no element passed', () => {
    expect(Element.position(null)).toBe(null)
  })
})

describe('Element.positionRelativeTo', () => {
  // jsdom does not implement layout

  const el = {
    offsetParent: 1,
    offsetLeft: 2,
    offsetRight: 3,
    scrollTop: 4,
    scrollLeft: 5,
    getBoundingClientRect(){
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
    getBoundingClientRect(){
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

    const position = Element.positionRelativeTo(el, otherEl)
    expect(position).toEqual(expectedPosition)
  })

  it('should return null if no base element passed', () => {
    expect(Element.positionRelativeTo(null, otherEl)).toBe(null)
  })

  it('should return null if no relative element passed', () => {
    expect(Element.positionRelativeTo(el, null)).toBe(null)
  })
})
