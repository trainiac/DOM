import { map, compact, flow, curry, uniq } from 'lodash/fp'
import closest from '../element/closest'

export default curry(
  (selection, scopeEl, elements) => flow(
    map(closest(selection, scopeEl)),
    compact,
    uniq
  )(elements)
)
