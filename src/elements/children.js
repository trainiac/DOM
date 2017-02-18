import { map, flow, curry, flatten } from '../utils'
import children from '../element/children'

export default curry(
  (selection, elements) => flow(
    map(children(selection)),
    flatten
  )(elements)
)
