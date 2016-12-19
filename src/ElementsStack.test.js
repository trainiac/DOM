/* eslint-disable no-magic-numbers */

import fp from 'lodash/fp'
import ElementsStack from './ElementsStack'


describe('ElementsStack', () => {

  beforeAll(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <span class="child one">
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

  it('.constructor should accept nothing', () => {
    const es = new ElementsStack()
    expect(es.stack).toEqual([])
  })

  it('.constructor should accept a selector', () => {
    const es = new ElementsStack('.container')
    const containers = fp.toArray(document.querySelectorAll('.container'))
    expect(es.stack).toHaveLength(1)
    expect(es.stack[0][0]).toBe(containers[0])
  })

  it('.constructor should accept a node', () => {
    const container = document.querySelector('.container')
    const es = new ElementsStack(container)
    expect(es.stack).toHaveLength(1)
    expect(es.stack[0][0]).toBe(container)
  })


  it('.element should return first matched element', () => {
    const container = document.querySelector('.container')
    const es = new ElementsStack('.container')
    expect(es.element())
  })

  it('.elements should return an array of all currently matched elements', () => {
    const containers = fp.toArray(document.querySelectorAll('.container'))
    const es = new ElementsStack('.container')
    const actualContainers = es.elements()
    expect(actualContainers[0]).toBe(containers[0])
    expect(actualContainers).toHaveLength(3)
  })

  it('.size should return the amount of currently matched elements', () => {
    const es = new ElementsStack('.container')
    expect(es.size()).toBe(3)
  })

  // jsdom currently doesn't support dataset hence the mock
  it('.data should retrieve data from data attibutes', () => {
    const wrapper = document.querySelector('.wrapper')
    wrapper.dataset = {
      foo: 'bar'
    }
    const es = new ElementsStack(wrapper)
    expect(es.data('foo')).toBe('bar')
  })

  // jsdom doesn't implement layout
  it('.dimensions should retrieve dimensions', () => {
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
    const wrapper = document.querySelector('.wrapper')
    wrapper.clientWidth = 1
    wrapper.clientHeight = 2
    wrapper.scrollWidth = 3
    wrapper.scrollHeight = 4
    wrapper.offsetHeight = 5
    wrapper.offsetWidth = 6
    wrapper.getBoundingClientRect = () => {
      return {
        height: 7,
        width: 8
      }
    }

    const es = new ElementsStack(wrapper)
    expect(es.dimensions()).toEqual(expectedDimensions)
  })

  // jsdom does not implement layout
  it('.position should retrieve positioning', () => {
    const expectedPosition = {
      top: 7,
      left: 8,
      offsetParent: 1,
      offsetLeft: 2,
      offsetRight: 3,
      scrollTop: 4,
      scrollLeft: 5
    }

    const wrapper = document.querySelector('.wrapper')
    wrapper.offsetParent = 1
    wrapper.offsetLeft = 2
    wrapper.offsetRight = 3
    wrapper.scrollTop = 4
    wrapper.scrollLeft = 5
    wrapper.getBoundingClientRect = () => {
      return {
        top: 7,
        left: 8
      }
    }

    const es = new ElementsStack(wrapper)
    expect(es.position()).toEqual(expectedPosition)
  })

  // jsdom does not implement layout
  it('.positionRelativeTo should retrieve relative postioning', () => {

    const wrapper = document.querySelector('.wrapper')
    wrapper.offsetParent = 1
    wrapper.offsetLeft = 2
    wrapper.offsetRight = 3
    wrapper.scrollTop = 4
    wrapper.scrollLeft = 5
    wrapper.getBoundingClientRect = () => {
      return {
        top: 7,
        left: 8
      }
    }

    const container = document.querySelector('.container')
    container.offsetParent = 1
    container.offsetLeft = 2
    container.offsetRight = 3
    container.scrollTop = 4
    container.scrollLeft = 5
    container.getBoundingClientRect = () => {
      return {
        top: 8,
        left: 9
      }
    }

    const expectedPosition = {
      top: 1,
      left: 1
    }

    const es = new ElementsStack(wrapper)
    expect(es.positionRelativeTo(container)).toEqual(expectedPosition)
  })

  it('.index should give the index of a given element within the currently matched elements.', () => {
    const container = document.querySelector('.container')
    const es = new ElementsStack('.container')
    expect(es.index(container)).toBe(0)
  })

  it('.index should return -1 given element not within the currently matched elements.', () => {
    const wrapper = document.querySelector('.wrapper')
    const es = new ElementsStack('.container')
    expect(es.index(wrapper)).toBe(-1)
  })

  it('.is should return true when passed a selector that matches the current set', () => {
    const es = new ElementsStack('.container')
    expect(es.is('.container')).toBe(true)
  })

  it('.is should return true when passed a node that matches the current set', () => {
    const container = document.querySelector('.container')
    const es = new ElementsStack('.container')
    expect(es.is(container)).toBe(true)
  })

  it('.is should return false when passed a selector that doesnt match the current set', () => {
    const es = new ElementsStack('.container')
    expect(es.is('.wrapper')).toBe(false)
  })

  it('.end should rollback to the last set of matched elements', () => {
    const es = new ElementsStack('.container')
    const $anchors = es.find('a')
    expect($anchors.size()).toBe(8)
    const $containers = $anchors.end()
    expect($containers.size()).toBe(3)
  })

  it('.eq should return the ElementsStack instance that contains the element at the given instance', () => {
    const container = document.querySelector('.container')
    const es = new ElementsStack('.container')
    const $firstContainer = es.eq(0)
    expect($firstContainer.size()).toBe(1)
    expect($firstContainer.element()).toBe(container)
  })

  it('.first should return the ElementsStack instance that contains the first element', () => {
    const container = document.querySelector('.container')
    const es = new ElementsStack('.container')
    const $firstContainer = es.first()
    expect($firstContainer.size()).toBe(1)
    expect($firstContainer.element()).toBe(container)
  })

  it('.last should return the ElementsStack isntance that contains the last element', () => {
    const container = document.querySelector('.container:last-child')
    const es = new ElementsStack('.container')
    const $firstContainer = es.last()
    expect($firstContainer.size()).toBe(1)
    expect($firstContainer.element()).toBe(container)
  })

  it('.has should return currently matched elements that match the selector', () => {
    const es = new ElementsStack('.container')
    const secondContainer = es.element(1)
    const $hasOrphan = es.has('.orphan')
    expect($hasOrphan.size()).toBe(1)
    expect($hasOrphan.element()).toBe(secondContainer)
  })

  it('.slice', () => {
    const secondSpan = document.querySelector('span.two')
    const thirdSpan = document.querySelector('span.three')
    const fourSpan = document.querySelector('span.four')
    const es = new ElementsStack('span')
    const $spanSlice = es.slice(1, 4)
    expect($spanSlice.size()).toBe(3)
    expect($spanSlice.element()).toBe(secondSpan)
    expect($spanSlice.element(1)).toBe(thirdSpan)
    expect($spanSlice.element(2)).toBe(fourSpan)
  })

  it('.siblings', () => {
    const firstSpan = document.querySelector('span.one')
    const thirdSpan = document.querySelector('span.three')
    const fourSpan = document.querySelector('span.four')
    const es = new ElementsStack('span.two')
    const $siblings = es.siblings()
    expect($siblings.size()).toBe(3)
    expect($siblings.element()).toBe(firstSpan)
    expect($siblings.element(1)).toBe(thirdSpan)
    expect($siblings.element(2)).toBe(fourSpan)
  })

  it('.next', () => {
    const thirdSpan = document.querySelector('span.three')
    const es = new ElementsStack('span.two')
    const $siblings = es.next()
    expect($siblings.size()).toBe(1)
    expect($siblings.element()).toBe(thirdSpan)
  })

  it('.nextAll', () => {
    const thirdSpan = document.querySelector('span.three')
    const fourthSpan = document.querySelector('span.four')
    const es = new ElementsStack('span.two')
    const $nextSiblings = es.nextAll()
    expect($nextSiblings.size()).toBe(2)
    expect($nextSiblings.element()).toBe(thirdSpan)
    expect($nextSiblings.element(1)).toBe(fourthSpan)
  })

  it('.prev', () => {
    const firstSpan = document.querySelector('span.one')
    const es = new ElementsStack('span.two')
    const $prev = es.prev()
    expect($prev.size()).toBe(1)
    expect($prev.element()).toBe(firstSpan)
  })

  it('.prevAll', () => {
    const firstSpan = document.querySelector('span.one')
    const secondSpan = document.querySelector('span.two')
    const es = new ElementsStack('span.three')
    const $prevSiblings = es.prevAll()
    expect($prevSiblings.size()).toBe(2)
    expect($prevSiblings.element()).toBe(firstSpan)
    expect($prevSiblings.element(1)).toBe(secondSpan)
  })

  it('.closest', () => {
    const wrapper = document.querySelector('.wrapper')
    const es = new ElementsStack('span.one')
    const $wrapper = es.closest('.wrapper')
    expect($wrapper.size()).toBe(1)
    expect($wrapper.element()).toBe(wrapper)
  })

  it('.children', () => {
    const es = new ElementsStack('.wrapper')
    const firstContainer = document.querySelector('.container:first-child')
    const secondContainer = document.querySelector('.container:nth-child(2)')
    const thirdContainer = document.querySelector('.container:last-child')
    const $children = es.children()
    expect($children.size()).toBe(3)
    expect($children.element()).toBe(firstContainer)
    expect($children.element(1)).toBe(secondContainer)
    expect($children.element(2)).toBe(thirdContainer)
  })

  it('.not', () => {
    const es = new ElementsStack('span')
    const secondSpan = document.querySelector('span.two')
    const $spans = es.not('.two')
    expect($spans.size()).toBe(7)
    expect($spans.elements()).not.toContain(secondSpan)
  })

  it('.filter', () => {
    const es = new ElementsStack('span')
    const orphan = document.querySelector('.orphan')
    const $spans = es.filter('.child')
    expect($spans.size()).toBe(7)
    expect($spans.elements()).not.toContain(orphan)
  })

  it('.find', () => {
    const es = new ElementsStack('.container')
    const $spans = es.find('span')
    expect($spans.size()).toBe(8)
  })

  it('.parents', () => {
    const es = new ElementsStack('span')
    const $containers = es.parents()
    const firstContainer = document.querySelector('.container:first-child')
    const secondContainer = document.querySelector('.container:nth-child(2)')
    expect($containers.size()).toBe(2)
    expect($containers.element()).toBe(firstContainer)
    expect($containers.element(1)).toBe(secondContainer)
  })

  it('.ancestors', () => {
    const es = new ElementsStack('span')
    const $containers = es.ancestors()
    const firstContainer = document.querySelector('.container:first-child')
    const secondContainer = document.querySelector('.container:nth-child(2)')
    const wrapper = document.querySelector('.wrapper')
    expect($containers.size()).toBe(5)
    expect($containers.element()).toBe(firstContainer)
    expect($containers.element(1)).toBe(wrapper)
    expect($containers.element(2)).toBe(document.body)
    expect($containers.element(3)).toBe(document.documentElement)
    expect($containers.element(4)).toBe(secondContainer)
  })

  it('.elements, .eq, .first, .last should return empty arrays when called on an empty stack', () => {
    const es = new ElementsStack()
    expect(es.eq().elements()).toEqual([])
    expect(es.first().elements()).toEqual([])
    expect(es.last().elements()).toEqual([])
  })
})