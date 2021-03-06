import { prop, toArray, flow, curry } from '../utils'
import filter from '../elements/filter'

export default curry((selection, el) => {
  return flow(
    prop('children'),
    toArray,
    filter(selection)
  )(el)
})
