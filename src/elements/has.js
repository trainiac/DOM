import { curry, filter } from '../utils'
import has from '../element/has'

export default curry(
  (selection, elements) => filter(has(selection), elements)
)
