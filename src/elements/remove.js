import { remove, curry } from 'lodash/fp'
import matches from '../element/matches'

export default curry(
  (selection, elements) => remove(matches(selection), elements)
)
