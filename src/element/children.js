import curry from 'lodash/fp/curry'
import prop from 'lodash/fp/prop'
import toArray from 'lodash/fp/toArray'
import flow from 'lodash/fp/flow'
import filter from '../elements/filter'

export default curry((selection, el) => {
  return flow(
    prop('children'),
    toArray,
    filter(selection)
  )(el)
})
