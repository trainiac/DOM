import { curry, findFrom } from '../utils'
import children from './children'
import matches from './matches'

export default curry((selection, el) => {
  const siblings = children(null, el.parentNode)
  const index = siblings.indexOf(el) + 1
  if (index >= siblings.length) {
    return null
  }

  if (selection) {
    return findFrom(element => matches(selection, element), index, siblings)
  }

  return siblings[index]
})
