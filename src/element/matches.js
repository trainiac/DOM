import curry from 'lodash/fp/curry'
import isString from 'lodash/fp/isString'
import isElement from 'lodash/fp/isElement'

export default curry((selection, el) => {
  const matchFunc = (
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector
  )

  if (isString(selection)) {
    return matchFunc.call(el, selection)
  }

  if (isElement(selection)) {
    return selection === el
  }

  return false
})
