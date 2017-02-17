import { map, flow, curry, flatten } from 'lodash/fp'
import children from '../element/children'

export default curry(
  (selection, elements) => flow(
    map(children(selection)),
    flatten
  )(elements)
)
