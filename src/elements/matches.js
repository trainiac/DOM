import { some, curry } from '../utils'
import matches from '../element/matches'

export default curry(
  (selection, elements) => some(
    matches(selection)
  )(elements)
)
