import { curry } from '../utils'
import filter from '../elements/filter'
import children from './children'

export default curry((selection, el) => {
  const siblings = children(null, el.parentNode)
  const index = siblings.indexOf(el) + 1
  return filter(selection, siblings.slice(index))
})
