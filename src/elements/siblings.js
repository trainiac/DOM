import { uniq, map, flow, curry, flatten } from 'lodash/fp'
import siblings from '../element/siblings'

export default curry(
  (selection, elements) => flow(
    map(siblings(selection)),
    flatten,
    uniq
  )(elements)
)
