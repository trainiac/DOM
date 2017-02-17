import remove from 'lodash/fp/remove'
import curry from 'lodash/fp/curry'
import matches from '../element/matches'

export default curry(
  (selection, elements) => remove(matches(selection), elements)
)
