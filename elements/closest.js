import uniq from 'lodash/fp/uniq'
import map from 'lodash/fp/map'
import compact from 'lodash/fp/compact'
import flow from 'lodash/fp/flow'
import curry from 'lodash/fp/curry'
import closest from '../element/closest'

export default curry(
  (selection, scopeEl, elements) => flow(
    map(closest(selection, scopeEl)),
    compact,
    uniq
  )(elements)
)
