import { compact, flow, curry, map } from '../utils'
import next from '../element/next'

export default curry(
  (selection, elements) => flow(
    map(next(selection)),
    compact
  )(elements)
)
