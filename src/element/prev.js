import { curry, findFromRight } from '../utils'
import children from './children'
import matches from './matches'

export default curry((selection, el) => {
  const siblings = children(null, el.parentNode)
  const index = siblings.indexOf(el) - 1
  if (index < 0) {
    return null
  }

  if (selection) {
    return findFromRight(
      matches(selection),
      index,
      siblings.slice(0, index + 1)
    )
  }

  return siblings[index]
})
