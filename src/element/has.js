import { curry, isElement, isString, flow, negate, isEmpty } from 'lodash/fp'
import ancestors from './ancestors'
import find from './find'

export default curry((selection, el) => {
  if (isElement(selection)) {
    return flow(
      ancestors(el, el),
      negate(isEmpty)
    )(selection)
  }

  if (isString(selection)) {
    return flow(
      find(selection),
      negate(isEmpty)
    )(el)
  }

  return false
})
