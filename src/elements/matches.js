import { some, curry } from 'lodash/fp'
import matches from '../element/matches'

export default curry(
  (selection, elements) => some(
    matches(selection)
  )(elements)
)
