import filter from 'lodash/fp/filter'
import curry from 'lodash/fp/curry'
import has from '../element/has'

export default curry(
  (selection, elements) => filter(has(selection), elements)
)
