import curry from 'lodash/fp/curry'
import isString from 'lodash/fp/isString'
import isElement from 'lodash/fp/isElement'
import toArray from 'lodash/fp/toArray'
import eq from 'lodash/fp/eq'
import children from './children'


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

export default curry((selection, el) => {
  if(isElement(selection)){
    const found = walkUntil(eq(selection), el)
    return found ? [ found ] : []
  }

  if(isString(selection)){
    return toArray(el.querySelectorAll(selection))
  }

  return []
})
