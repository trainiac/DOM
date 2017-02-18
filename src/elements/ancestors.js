import { curry, flow, map, flatten, uniq } from '../utils'
import ancestors from '../element/ancestors'

export default curry(
  (selection, scopeEl, elements) => flow(
    map(ancestors(selection, scopeEl)),
    flatten,
    uniq
  )(elements)
)
