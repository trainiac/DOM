import flatten from 'lodash/fp/flatten'
import uniq from 'lodash/fp/uniq'
import map from 'lodash/fp/map'
import flow from 'lodash/fp/flow'
import curry from 'lodash/fp/curry'
import ancestors from '../element/ancestors'

export default curry(
  (selection, scopeEl, elements) => flow(
    map(ancestors(selection, scopeEl)),
    flatten,
    uniq
  )(elements)
)
