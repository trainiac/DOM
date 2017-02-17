import { compact, flow, curry, map } from 'lodash/fp'
import prev from '../element/prev'

export default curry(
  (selection, elements) => flow(
    map(prev(selection)),
    compact
  )(elements)
)
