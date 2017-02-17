import curry from 'lodash/fp/curry'
import isString from 'lodash/fp/isString'
import isElement from 'lodash/fp/isElement'
import flow from 'lodash/fp/flow'
import negate from 'lodash/fp/negate'
import isEmpty from 'lodash/fp/isEmpty'
import ancestors from './ancestors'
import find from './find'

export default curry((selection, el) => {
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
