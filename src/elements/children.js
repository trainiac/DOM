import flatten from 'lodash/fp/flatten'
import map from 'lodash/fp/map'
import flow from 'lodash/fp/flow'
import curry from 'lodash/fp/curry'
import children from '../element/children'

export default curry(
  (selection, elements) => flow(
    map(children(selection)),
    flatten
  )(elements)
)
