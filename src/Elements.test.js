import fp from 'lodash/fp'
const Elements = require('./Elements') // jest can't do import * as Element from './elememt'

describe.only('Elements.children', () => {
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
      </div>
    `
  })

  it('should iterate over elements and return the children for each one', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedContainerChildren = 4
    const expectedContainers = 2
    const children = Elements.children(containers, 'span')
    expect(children).toHaveLength(expectedContainers)
    for(const containerChildren of children){
      expect(containerChildren).toHaveLength(expectedContainerChildren)
    }
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
      </div>
    `
  })

  it('should iterate over elements and within each element find elements that match the given selector', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const expectedFinds = 2
    const expectedContainerFind = 4
    const containerFinds = Elements.find(containers, 'a')
    expect(containerFinds).toHaveLength(expectedFinds)
    for(const containerFind of containerFinds){
      expect(containerFind).toHaveLength(expectedContainerFind)
    }
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
          <span class="orphan four"></span>
        </div>
      </div>
    `
  })

  it('should iterate over elements and return all unique siblings ', () => {
    const spans = fp.toArray(document.querySelectorAll('.child'))
    const expectedSiblings = 7
    const siblings = Elements.siblings(spans, '.child')
    expect(siblings).toHaveLength(expectedSiblings)
  })
})


describe('Elements.next', () => {
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
})

describe('Elements.nextAll', () => {
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
})

describe('Elements.prev', () => {
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
})

describe('Elements.prevAll', () => {
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

})

describe('Elements.closest', () => {
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


})

describe('Elements.ancestors', () => {
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

})

describe('Elements.has', () => {
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

})
