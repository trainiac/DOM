import { curry, isString, flow, prop, isElement } from '../utils'
import ancestors from './ancestors'
import find from './find'

export default curry((selection, el) => {
  if (isElement(selection)) {
    return flow(
      ancestors(el, el),
      prop('length'),
      Boolean
    )(selection)
  }

  if (isString(selection)) {
    return flow(
      find(selection),
      prop('length'),
      Boolean
    )(el)
  }

  return false
})
