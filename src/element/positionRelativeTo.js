import curry from 'lodash/fp/curry'
import position from './position'

export default curry((otherEl, el) => {
  const myPosition = position(el)
  if (!myPosition) {
    return null
  }

  const otherPosition = position(otherEl)
  if (!otherPosition) {
    return null
  }

  return {
    top: otherPosition.top - myPosition.top,
    left: otherPosition.left - myPosition.left
  }
})
