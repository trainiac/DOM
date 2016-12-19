import fp from 'lodash/fp'
const Elements = require('./Elements') // jest can't do import * as Element from './elememt'

describe('Elements.children', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <span class="child"></span>
          <span class="child two"></span>
          <span class="child three"></span>
          <span class="child four"></span>
        </div>
        <div class="container">
          <span class="child five"></span>
          <span class="child six"></span>
          <span class="child seven"></span>
          <span class="orphan four"></span>
        </div>
        <div class="container">
        </div>
      </div>
    `
  })

  it('should return all children', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedChildren = 8
    const children = Elements.children(containers)
    expect(children).toHaveLength(expectedChildren)
  })

  it('should return only children that matched the selector', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedChildren = 7
    const children = Elements.children(containers, '.child')
    expect(children).toHaveLength(expectedChildren)
  })

  it('should return only child that matched a node', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const orphan = document.querySelector('.orphan')
    const expectedChildren = 1
    const children = Elements.children(containers, orphan)
    expect(children).toHaveLength(expectedChildren)
  })

  it('should return empty list if no children are found', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedChildren = 0
    const children = Elements.children(containers, '.foo')
    expect(children).toHaveLength(expectedChildren)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = Elements.children([])
    expect(elements).toHaveLength(0)
  })
})

describe('Elements.find', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <span class="child">
            <a href="#">Link</a>
          </span>
          <span class="child two">
            <a href="#">Link</a>
          </span>
          <span class="child three">
            <a href="#">Link</a>
          </span>
          <span class="child four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="container">
          <span class="child five">
            <a href="#">Link</a>
          </span>
          <span class="child six">
            <a href="#">Link</a>
          </span>
          <span class="child seven">
            <a href="#">Link</a>
          </span>
          <span class="orphan four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="container"></div>
      </div>
    `
  })

  it('should return all found elements', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedElements = 8
    const elements = Elements.find(containers, 'a')
    expect(elements).toHaveLength(expectedElements)
  })

  it('should return only descendants that matched the selector', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedElements = 7
    const elements = Elements.find(containers, '.child a')
    expect(elements).toHaveLength(expectedElements)
  })

  it('should return only child that matched a node', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const orphan = document.querySelector('.orphan a')
    const expectedElements = 1
    const elements = Elements.find(containers, orphan)
    expect(elements).toHaveLength(expectedElements)
  })

  it('should return empty list if no descendants are found', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedElements = 0
    const elements = Elements.find(containers, '.foo')
    expect(elements).toHaveLength(expectedElements)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = Elements.find([])
    expect(elements).toHaveLength(0)
  })
})

describe('Elements.siblings', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <span class="child"></span>
          <span class="child two"></span>
          <span class="child three"></span>
          <span class="child four"></span>
        </div>
        <div class="container">
          <span class="child five"></span>
          <span class="child six"></span>
          <span class="child seven"></span>
          <span class="orphan eight"></span>
        </div>
        <div class="container">
          <span class="child nine"></span>
        </div>
      </div>
    `
  })

  it('should return all found siblings', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const expectedSiblings = 8
    const siblings = Elements.siblings(spans)
    expect(siblings).toHaveLength(expectedSiblings)
  })

  it('should return only siblings that matched the selector', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const expectedSiblings = 1
    const siblings = Elements.siblings(spans, '.orphan')
    expect(siblings).toHaveLength(expectedSiblings)
  })

  it('should return only child that matched a node', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const orphan = document.querySelector('.orphan')
    const expectedSiblings = 1
    const siblings = Elements.siblings(spans, orphan)
    expect(siblings).toHaveLength(expectedSiblings)
  })

  it('should return empty list if no siblings are found', () => {
    const spans = fp.toArray(document.querySelectorAll('span'))
    const expectedSiblings = 0
    const siblings = Elements.siblings(spans, '.foo')
    expect(siblings).toHaveLength(expectedSiblings)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = Elements.siblings([])
    expect(elements).toHaveLength(0)
  })
})


describe('Elements.next', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <span class="child"></span>
          <span class="child two"></span>
          <span class="child three"></span>
          <span class="child four"></span>
        </div>
        <div class="container">
          <span class="child five"></span>
          <span class="child six"></span>
          <span class="child seven"></span>
          <span class="orphan eight"></span>
        </div>
        <div class="container">
          <span class="child nine"></span>
        </div>
      </div>
    `
  })

  it('should return all next elements', () => {
    const spans = fp.toArray(document.querySelectorAll('span:first-child'))
    const expectedNext = 2
    const elements = Elements.next(spans)
    expect(elements).toHaveLength(expectedNext)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = Elements.next([])
    expect(elements).toHaveLength(0)
  })
})

describe('Elements.nextAll', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <span class="child"></span>
          <span class="child two"></span>
          <span class="child three"></span>
          <span class="child four"></span>
        </div>
        <div class="container">
          <span class="child five"></span>
          <span class="child six"></span>
          <span class="child seven"></span>
          <span class="orphan eight"></span>
        </div>
        <div class="container">
          <span class="child nine"></span>
        </div>
      </div>
    `
  })

  it('should return all following sibling elements', () => {
    const spans = fp.toArray(document.querySelectorAll('span:first-child'))
    const expectedNextAll = 6
    const elements = Elements.nextAll(spans)
    expect(elements).toHaveLength(expectedNextAll)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = Elements.nextAll([])
    expect(elements).toHaveLength(0)
  })
})

describe('Elements.prev', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <span class="child"></span>
          <span class="child two"></span>
          <span class="child three"></span>
          <span class="child four"></span>
        </div>
        <div class="container">
          <span class="child five"></span>
          <span class="child six"></span>
          <span class="child seven"></span>
          <span class="orphan eight"></span>
        </div>
        <div class="container">
          <span class="child nine"></span>
        </div>
      </div>
    `
  })

  it('should return all prev elements', () => {
    const spans = fp.toArray(document.querySelectorAll('span:last-child'))
    const expectedPrev = 2
    const elements = Elements.prev(spans)
    expect(elements).toHaveLength(expectedPrev)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = Elements.prev([])
    expect(elements).toHaveLength(0)
  })
})

describe('Elements.prevAll', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <span class="child"></span>
          <span class="child two"></span>
          <span class="child three"></span>
          <span class="child four"></span>
        </div>
        <div class="container">
          <span class="child five"></span>
          <span class="child six"></span>
          <span class="child seven"></span>
          <span class="orphan eight"></span>
        </div>
        <div class="container">
          <span class="child nine"></span>
        </div>
      </div>
    `
  })

  it('should return all previous sibling elements', () => {
    const spans = fp.toArray(document.querySelectorAll('span:last-child'))
    const expectedPrevAll = 6
    const elements = Elements.prevAll(spans)
    expect(elements).toHaveLength(expectedPrevAll)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = Elements.prevAll([])
    expect(elements).toHaveLength(0)
  })
})

describe('Elements.closest', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <span class="child">
            <a href="#">Link</a>
          </span>
          <span class="child two">
            <a href="#">Link</a>
          </span>
          <span class="child three">
            <a href="#">Link</a>
          </span>
          <span class="child four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="container">
          <span class="child five">
            <a href="#">Link</a>
          </span>
          <span class="child six">
            <a href="#">Link</a>
          </span>
          <span class="child seven">
            <a href="#">Link</a>
          </span>
          <span class="orphan four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="child">
          <span class="grandchild"></span>
        </div>
      </div>
    `
  })

  it('should return all closest that match a selector', () => {
    const children = fp.toArray(document.querySelectorAll('.child'))
    const expectedClosest = 2
    const closests = Elements.closest(children, '.container')
    expect(closests).toHaveLength(expectedClosest)
  })

  it('should return only closest that matched a node', () => {
    const children = fp.toArray(document.querySelectorAll('.child'))
    const firstContainer = document.querySelector('.container')
    const expectedClosest = 1
    const closests = Elements.closest(children, firstContainer)
    expect(closests).toHaveLength(expectedClosest)
  })

  it('should return emply list if no selector passed', () => {
    const children = fp.toArray(document.querySelectorAll('.child'))
    const expectedClosest = 0
    const closests = Elements.closest(children)
    expect(closests).toHaveLength(expectedClosest)
  })

  it('should return empty list if ancestor outside of scope', () => {
    const grandchild = fp.toArray(document.querySelectorAll('.grandchild'))
    const divChild = document.querySelector('div.child')
    const expectedClosestWhenNoScope = 1
    const closestWrapper = Elements.closest(grandchild, '.wrapper')
    expect(closestWrapper).toHaveLength(expectedClosestWhenNoScope)
    const closestEmpty = Elements.closest(grandchild, '.wrapper', divChild)
    expect(closestEmpty).toHaveLength(0)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = Elements.closest([])
    expect(elements).toHaveLength(0)
  })
})

describe('Elements.ancestors', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <span class="child">
            <a href="#">Link</a>
          </span>
          <span class="child two">
            <a href="#">Link</a>
          </span>
          <span class="child three">
            <a href="#">Link</a>
          </span>
          <span class="child four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="container">
          <span class="child five">
            <a href="#">Link</a>
          </span>
          <span class="child six">
            <a href="#">Link</a>
          </span>
          <span class="child seven">
            <a href="#">Link</a>
          </span>
          <span class="orphan four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="container"></div>
      </div>
    `
  })

  it('should return all ancestors', () => {
    const anchors = fp.toArray(document.querySelectorAll('a'))
    const spans = 8
    const containers = 2
    const wrapper = 1
    const body = 1
    const html = 1
    const expectedAncestors = spans + containers + wrapper + body + html
    const ancestors = Elements.ancestors(anchors)
    expect(ancestors).toHaveLength(expectedAncestors)
  })

  it('should return all ancestors that match a selector', () => {
    const anchors = fp.toArray(document.querySelectorAll('a'))
    const expectedAncestors = 2
    const ancestors = Elements.ancestors(anchors, '.container')
    expect(ancestors).toHaveLength(expectedAncestors)
  })

  it('should return ancestor that matches a node', () => {
    const anchors = fp.toArray(document.querySelectorAll('a'))
    const firstContainer = document.querySelector('.container')
    const expectedAncestors = 1
    const ancestors = Elements.ancestors(anchors, firstContainer)
    expect(ancestors).toHaveLength(expectedAncestors)
  })

  it('should return an empty list of nothing matches', () => {
    const anchors = fp.toArray(document.querySelectorAll('a'))
    const expectedAncestors = 0
    const ancestors = Elements.ancestors(anchors, '.foo')
    expect(ancestors).toHaveLength(expectedAncestors)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = Elements.ancestors([])
    expect(elements).toHaveLength(0)
  })
})

describe('Elements.has', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <span class="child">
            <a href="#">Link</a>
          </span>
          <span class="child two">
            <a href="#">Link</a>
          </span>
          <span class="child three">
            <a href="#">Link</a>
          </span>
          <span class="child four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="container">
          <span class="child five">
            <a href="#">Link</a>
          </span>
          <span class="child six">
            <a href="#">Link</a>
          </span>
          <span class="child seven">
            <a href="#">Link</a>
          </span>
          <span class="orphan four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="container"></div>
      </div>
    `
  })

  it('should return elements that have a matched selector', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedCount = 2
    const filtered = Elements.has(containers, 'span')
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return elements that have a matched selector', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const firstSpan = document.querySelector('span.child')
    const expectedCount = 1
    const filtered = Elements.has(containers, firstSpan)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return an empty list if nothing is passed', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedCount = 0
    const filtered = Elements.has(containers)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return an empty list if nothing is matched', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedCount = 0
    const filtered = Elements.has(containers, '.foo')
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = Elements.has([])
    expect(elements).toHaveLength(0)
  })
})

describe('Elements.is', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <span class="child">
            <a href="#">Link</a>
          </span>
          <span class="child two">
            <a href="#">Link</a>
          </span>
          <span class="child three">
            <a href="#">Link</a>
          </span>
          <span class="child four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="container">
          <span class="child five">
            <a href="#">Link</a>
          </span>
          <span class="child six">
            <a href="#">Link</a>
          </span>
          <span class="child seven">
            <a href="#">Link</a>
          </span>
          <span class="orphan four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="container"></div>
      </div>
    `
  })

  it('should return true for set that has a matched selector', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const isContainer = Elements.is(containers, '.container')
    expect(isContainer).toBe(true)
  })

  it('should return true for set that has a matched node', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const container = containers[0]
    const isContainer = Elements.is(containers, container)
    expect(isContainer).toBe(true)
  })

  it('should return an empty list if nothing is matched', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const isContainer = Elements.is(containers, '.foo')
    expect(isContainer).toBe(false)
  })

  it('should return false if starting with empty list', () => {
    const elements = Elements.is([])
    expect(elements).toBe(false)
  })
})

describe('Elements.remove', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <span class="child">
            <a href="#">Link</a>
          </span>
          <span class="child two">
            <a href="#">Link</a>
          </span>
          <span class="child three">
            <a href="#">Link</a>
          </span>
          <span class="child four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="container">
          <span class="child five">
            <a href="#">Link</a>
          </span>
          <span class="child six">
            <a href="#">Link</a>
          </span>
          <span class="child seven">
            <a href="#">Link</a>
          </span>
          <span class="child orphan four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="container"></div>
      </div>
    `
  })

  it('should return elements that do not match selector', () => {
    const children = fp.toArray(document.querySelectorAll('.child'))
    const expectedCount = 7
    const filtered = Elements.remove(children, '.orphan')
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return elements that do not match a node', () => {
    const children = fp.toArray(document.querySelectorAll('.child'))
    const orphan = document.querySelector('.orphan')
    const expectedCount = 7
    const filtered = Elements.remove(children, orphan)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return the same list if nothing is passed', () => {
    const children = fp.toArray(document.querySelectorAll('.child'))
    const expectedCount = 8
    const filtered = Elements.remove(children)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return the same list if nothing is matched', () => {
    const children = fp.toArray(document.querySelectorAll('.child'))
    const expectedCount = 8
    const filtered = Elements.remove(children, '.foo')
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = Elements.remove([])
    expect(elements).toHaveLength(0)
  })
})

describe('Elements.filter', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <span class="child">
            <a href="#">Link</a>
          </span>
          <span class="child two">
            <a href="#">Link</a>
          </span>
          <span class="child three">
            <a href="#">Link</a>
          </span>
          <span class="child four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="container">
          <span class="child five">
            <a href="#">Link</a>
          </span>
          <span class="child six">
            <a href="#">Link</a>
          </span>
          <span class="child seven">
            <a href="#">Link</a>
          </span>
          <span class="orphan four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="container"></div>
      </div>
    `
  })

  it('should return elements that match selector', () => {
    const children = fp.toArray(document.querySelectorAll('span'))
    const expectedCount = 7
    const filtered = Elements.filter(children, '.child')
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return elements that match a node', () => {
    const children = fp.toArray(document.querySelectorAll('span'))
    const orphan = document.querySelector('.orphan')
    const expectedCount = 1
    const filtered = Elements.filter(children, orphan)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return the same list if nothing is passed', () => {
    const children = fp.toArray(document.querySelectorAll('span'))
    const expectedCount = 8
    const filtered = Elements.filter(children)
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return an empty list if nothing is matched', () => {
    const children = fp.toArray(document.querySelectorAll('span'))
    const expectedCount = 0
    const filtered = Elements.filter(children, '.foo')
    expect(filtered).toHaveLength(expectedCount)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = Elements.filter([])
    expect(elements).toHaveLength(0)
  })
})

describe('Elements.parents', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <span class="child">
            <a href="#">Link</a>
          </span>
          <span class="child two">
            <a href="#">Link</a>
          </span>
          <span class="child three">
            <a href="#">Link</a>
          </span>
          <span class="child four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="container">
          <span class="child five">
            <a href="#">Link</a>
          </span>
          <span class="child six">
            <a href="#">Link</a>
          </span>
          <span class="child seven">
            <a href="#">Link</a>
          </span>
          <span class="orphan four">
            <a href="#">Link</a>
          </span>
        </div>
        <div class="child">
          <span class="grandchild"></span>
        </div>
      </div>
    `
  })

  it('should return all parents', () => {
    const children = fp.toArray(document.querySelectorAll('a'))
    const expectedParents = 8
    const parents = Elements.parents(children)
    expect(parents).toHaveLength(expectedParents)
  })

  it('should return all parents that match a selector', () => {
    const children = fp.toArray(document.querySelectorAll('a'))
    const expectedParents = 7
    const parents = Elements.parents(children, '.child')
    expect(parents).toHaveLength(expectedParents)
  })

  it('should return parent that matched a node', () => {
    const children = fp.toArray(document.querySelectorAll('a'))
    const orphan = document.querySelector('.orphan')
    const expectedParents = 1
    const parents = Elements.parents(children, orphan)
    expect(parents).toHaveLength(expectedParents)
  })

  it('should return an empty list if starting with empty list', () => {
    const elements = Elements.parents([])
    expect(elements).toHaveLength(0)
  })
})
