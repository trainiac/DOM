import fp from 'lodash/fp'

const notEq = item => other => item !== other

export const matches = fp.curry((selection, el) => {
  const matchFunc = (
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector
  )

  if(fp.isString(selection)){
    return matchFunc.call(el, selection)
  }

  if(fp.isElement(selection)){
    return selection === el
  }

  return false
})

export const children = fp.curry((selection, el) => {
  return fp.flow(
    fp.prop('children'),
    fp.toArray,
    fp.filter(selection ? matches(selection) : fp.identity)
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

export const find = fp.curry((selection, el) => {
  if(fp.isElement(selection)){
    const found = walkUntil(fp.eq(selection), el)
    return found ? [ found ] : []
  }

  if(fp.isString(selection)){
    return fp.toArray(el.querySelectorAll(selection))
  }

  return []
})

export const siblings = fp.curry((selection, el) => {
  const siblings = children(selection, el.parentNode)
  return fp.filter(notEq(el))(siblings)
})

export const next = el => {
  const siblings = children(null, el.parentNode)
  const index = siblings.indexOf(el) + 1
  if(index >= siblings.length){
    return null
  }
  return fp.nth(index, siblings)
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
  return fp.nth(index, siblings)
}

export const prevAll = el => {
  const siblings = children(null, el.parentNode)
  const index = siblings.indexOf(el)
  return siblings.slice(0, index)
}

export const closest = fp.curry((selection, scopeEl, el) => {
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

export const ancestors = fp.curry((selection, scopeEl, el) => {
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

export const has = fp.curry((selection, el) => {
  if(fp.isElement(selection)){
    return fp.flow(
      ancestors(el, el),
      fp.negate(fp.isEmpty)
    )(selection)
  }

  if(fp.isString(selection)){
    return fp.flow(
      find(selection),
      fp.negate(fp.isEmpty)
    )(el)
  }

  return false
})

export const data = (el, key) => { // eslint-disable-line id-blacklist
  const value = fp.prop(`dataset.${key}`, el)
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

