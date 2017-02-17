import map from 'lodash/fp/map'
import compact from 'lodash/fp/compact'
import flow from 'lodash/fp/flow'
import curry from 'lodash/fp/curry'
import prev from '../element/prev'

export default curry(
  (selection, elements) => flow(
    map(prev(selection)),
    compact
  )(elements)
)
