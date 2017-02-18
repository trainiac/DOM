import { uniq, map, flow, curry, flatten } from '../utils'
import find from '../element/find'

export default curry(
  (selection, elements) => flow(
    map(find(selection)),
    flatten,
    uniq
  )(elements)
)
