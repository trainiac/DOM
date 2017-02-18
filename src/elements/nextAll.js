import { uniq, map, flow, curry, flatten } from '../utils'
import nextAll from '../element/nextAll'

export default curry(
  (selection, elements) => flow(
    map(nextAll(selection)),
    flatten,
    uniq
  )(elements)
)
