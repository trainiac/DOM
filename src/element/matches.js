import { curry, isElement, isString } from '../utils'

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
