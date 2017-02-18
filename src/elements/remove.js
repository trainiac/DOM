import { remove, curry } from '../utils'
import matches from '../element/matches'

export default curry(
  (selection, elements) => remove(matches(selection), elements)
)
