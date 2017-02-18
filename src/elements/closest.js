import { uniq, map, compact, flow, curry} from '../utils'
import closest from '../element/closest'

export default curry(
  (selection, scopeEl, elements) => flow(
    map(closest(selection, scopeEl)),
    compact,
    uniq
  )(elements)
)
