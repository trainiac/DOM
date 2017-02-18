import { uniq, map, flow, curry, flatten } from '../utils'
import prevAll from '../element/prevAll'

export default curry(
  (selection, elements) => flow(
    map(prevAll(selection)),
    flatten,
    uniq
  )(elements)
)
