import filter from 'lodash/fp/filter'
import curry from 'lodash/fp/curry'
import matches from '../element/matches'

export default curry((selection, elements) => {
  if(!selection){
    return elements
  }

  return filter(
    matches(selection),
    elements
  )
})
