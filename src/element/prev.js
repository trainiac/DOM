import curry from 'lodash/fp/curry'
import nth from 'lodash/fp/nth'
import findLastFrom from 'lodash/fp/findLastFrom'
import children from './children'
import matches from './matches'

export default curry((selection, el) => {
  const siblings = children(null, el.parentNode)
  const index = siblings.indexOf(el) - 1
  if (index < 0) {
    return null
  }

  if (selection) {
    return findLastFrom(
      matches(selection),
      index,
      siblings.slice(0, index)
    )
  }

  return nth(index, siblings)
})
