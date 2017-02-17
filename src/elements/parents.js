import { map, compact, flow, prop, curry, uniq } from 'lodash/fp'
import filter from './filter'

export default curry(
  (selection, elements) => flow(
    map(prop('parentElement')),
    compact,
    uniq,
    filter(selection)
  )(elements)
)
