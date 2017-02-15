import curry from 'lodash/fp/curry'
import isString from 'lodash/fp/isString'
import isElement from 'lodash/fp/isElement'
import prop from 'lodash/fp/prop'
import toArray from 'lodash/fp/toArray'
import flow from 'lodash/fp/flow'
import filter from 'lodash/fp/filter'
import negate from 'lodash/fp/negate'
import identity from 'lodash/fp/identity'
import eq from 'lodash/fp/eq'
import nth from 'lodash/fp/nth'
import isEmpty from 'lodash/fp/isEmpty'

const notEq = item => other => item !== other

export const matches = curry((selection, el) => {
  const matchFunc = (
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector
  )

  if(isString(selection)){
    return matchFunc.call(el, selection)
  }

  if(isElement(selection)){
    return selection === el
  }

  return false
})

export const children = curry((selection, el) => {
  return flow(
    prop('children'),
    toArray,
    filter(selection ? matches(selection) : identity)
  )(el)
})

const walkUntil = (func, el) => {
  const elChildren = children(null, el)
  for(const child of elChildren){
    if(func(child)){
      return child
    }

    const found = walkUntil(func, child)
    if(found){
      return found
    }
  }

  return null
}

export const find = curry((selection, el) => {
  if(isElement(selection)){
    const found = walkUntil(eq(selection), el)
    return found ? [ found ] : []
  }

  if(isString(selection)){
    return toArray(el.querySelectorAll(selection))
  }

  return []
})

export const siblings = curry((selection, el) => {
  const siblings = children(selection, el.parentNode)
  return filter(notEq(el))(siblings)
})

export const next = el => {
  const siblings = children(null, el.parentNode)
  const index = siblings.indexOf(el) + 1
  if(index >= siblings.length){
    return null
  }
  return nth(index, siblings)
}

export const nextAll = el => {
  const siblings = children(null, el.parentNode)
  const index = siblings.indexOf(el) + 1
  return siblings.slice(index)
}

export const prev = el => {
  const siblings = children(null, el.parentNode)
  const index = siblings.indexOf(el) - 1
  if(index < 0){
    return null
  }
  return nth(index, siblings)
}

export const prevAll = el => {
  const siblings = children(null, el.parentNode)
  const index = siblings.indexOf(el)
  return siblings.slice(0, index)
}

export const closest = curry((selection, scopeEl, el) => {
  let parent = el

  if(!selection){
    return null
  }

  while(parent){
    if(matches(selection, parent)){
      return parent
    }

    if(scopeEl && matches(scopeEl, parent)){
      break
    }

    parent = parent.parentElement
  }

  return null
})

export const ancestors = curry((selection, scopeEl, el) => {
  let parent = el.parentElement
  const ancestors = []
  while(parent){
    if(selection){
      if(matches(selection, parent)){
        ancestors.push(parent)
      }
    }else{
      ancestors.push(parent)
    }

    if(scopeEl && matches(parent, scopeEl)){
      break
    }

    parent = parent.parentElement
  }

  return ancestors
})

export const has = curry((selection, el) => {
  if(isElement(selection)){
    return flow(
      ancestors(el, el),
      negate(isEmpty)
    )(selection)
  }

  if(isString(selection)){
    return flow(
      find(selection),
      negate(isEmpty)
    )(el)
  }

  return false
})

export const data = (el, key) => { // eslint-disable-line id-blacklist
  const value = prop(`dataset.${key}`, el)
  return value !== undefined ? value : null
}

export const dimensions = el => {
  if(!el){
    return null
  }

  const rect = el.getBoundingClientRect()

  return {
    innerWidth: el.clientWidth,
    innerHeight: el.clientHeight,
    scrollWidth: el.scrollWidth,
    scrollHeight: el.scrollHeight,
    nonTransformWidth: el.offsetWidth,
    nonTransformHeight: el.offsetHeight,
    height: rect.height,  // only different from offset when transform applied
    width: rect.width     // only different from offset when transform applied
  }
}

export const position = el => {
  if(!el){
    return null
  }

  const rect = el.getBoundingClientRect()

  return {
    top: rect.top + window.pageXOffset,
    left: rect.left + window.pageYOffset,
    offsetParent: el.offsetParent,
    offsetLeft: el.offsetLeft,
    offsetRight: el.offsetRight,
    scrollTop: el.scrollTop,
    scrollLeft: el.scrollLeft
  }
}


export const positionRelativeTo = (el, otherEl) => {
  const myPosition = position(el)
  if(!myPosition){
    return null
  }

  const otherPosition = position(otherEl)
  if(!otherPosition){
    return null
  }

  return {
    top: otherPosition.top - myPosition.top,
    left: otherPosition.left - myPosition.left
  }
}

