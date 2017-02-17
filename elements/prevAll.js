import flatten from 'lodash/fp/flatten'
import uniq from 'lodash/fp/uniq'
import map from 'lodash/fp/map'
import flow from 'lodash/fp/flow'
import curry from 'lodash/fp/curry'
import prevAll from '../element/prevAll'

export default curry(
  (selection, elements) => flow(
    map(prevAll(selection)),
    flatten,
    uniq
  )(elements)
)
