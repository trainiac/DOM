import { curry } from '../utils'
import matches from './matches'

export default curry((selection, scopeEl, el) => {
  let parent = el

  if (!selection) {
    return null
  }

  while (parent) {
    if (matches(selection, parent)) {
      return parent
    }

    if (scopeEl && matches(scopeEl, parent)) {
      break
    }

    parent = parent.parentElement
  }

  return null
})