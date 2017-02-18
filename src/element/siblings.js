import { curry, filter } from '../utils'
import children from './children'

export const notEq = item => other => item !== other

export default curry((selection, el) => {
  const siblings = children(selection, el.parentNode)
  return filter(notEq(el), siblings)
})
