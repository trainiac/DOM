import { filter, curry } from 'lodash/fp'
import matches from '../element/matches'

export default curry((selection, elements) => {
  if (!selection) {
    return elements
  }

  return filter(
    matches(selection),
    elements
  )
})
