import { uniq, map, flow, curry, flatten } from 'lodash/fp'
import ancestors from '../element/ancestors'

export default curry(
  (selection, scopeEl, elements) => flow(
    map(ancestors(selection, scopeEl)),
    flatten,
    uniq
  )(elements)
)
