import curry from 'lodash/fp/curry'
import matches from './matches'

export default curry((selection, scopeEl, el) => {
  let parent = el.parentElement
  const ancestors = []
  while (parent) {
    if (selection) {
      if (matches(selection, parent)) {
        ancestors.push(parent)
      }
    } else {
      ancestors.push(parent)
    }

    if (scopeEl && matches(parent, scopeEl)) {
      break
    }

    parent = parent.parentElement
  }

  return ancestors
})
