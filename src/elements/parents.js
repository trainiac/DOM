import uniq from 'lodash/fp/uniq'
import map from 'lodash/fp/map'
import compact from 'lodash/fp/compact'
import flow from 'lodash/fp/flow'
import prop from 'lodash/fp/prop'
import curry from 'lodash/fp/curry'
import filter from './filter'

export default curry(
  (selection, elements) => flow(
    map(prop('parentElement')),
    compact,
    uniq,
    filter(selection)
  )(elements)
)
