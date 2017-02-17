import { curry, filter } from 'lodash/fp'
import has from '../element/has'

export default curry(
  (selection, elements) => filter(has(selection), elements)
)
