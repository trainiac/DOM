import flatten from 'lodash/fp/flatten'
import uniq from 'lodash/fp/uniq'
import map from 'lodash/fp/map'
import flow from 'lodash/fp/flow'
import curry from 'lodash/fp/curry'
import nextAll from '../element/nextAll'

export default curry(
  (selection, elements) => flow(
    map(nextAll(selection)),
    flatten,
    uniq
  )(elements)
)
