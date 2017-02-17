import some from 'lodash/fp/some'
import curry from 'lodash/fp/curry'
import matches from '../element/matches'

export default curry(
  (selection, elements) => some(
    matches(selection)
  )(elements)
)
