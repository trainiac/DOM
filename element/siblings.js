import curry from 'lodash/fp/curry'
import filter from 'lodash/fp/filter'
import children from './children'

export const notEq = item => other => item !== other

export default curry((selection, el) => {
  const siblings = children(selection, el.parentNode)
  return filter(notEq(el), siblings)
})
