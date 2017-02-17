import flow from 'lodash/fp/flow'
import isString from 'lodash/fp/isString'
import isElement from 'lodash/fp/isElement'
import find from '../element/find'

export default function (selection, scopeEl, ...funcs) {
  let elements

  if (isString(selection)) {
    elements = find(selection, scopeEl)
  } else if (isElement(selection)) {
    elements = [selection]
  } else {
    elements = []
  }

  if (!funcs.length || !elements.length) {
    return elements
  }

  return flow(...funcs)(elements)
}
