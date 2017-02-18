import { curry } from '../utils'
import children from './children'
import filter from '../elements/filter'

export default curry((selection, el) => {
  const siblings = children(null, el.parentNode)
  const index = siblings.indexOf(el)
  return filter(selection, siblings.slice(0, index))
})
