import { uniq, map, flow, curry, flatten } from 'lodash/fp'
import prevAll from '../element/prevAll'

export default curry(
  (selection, elements) => flow(
    map(prevAll(selection)),
    flatten,
    uniq
  )(elements)
)
