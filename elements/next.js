import map from 'lodash/fp/map'
import compact from 'lodash/fp/compact'
import flow from 'lodash/fp/flow'
import curry from 'lodash/fp/curry'
import next from '../element/next'

export default curry(
  (selection, elements) => flow(
    map(next(selection)),
    compact
  )(elements)
)
