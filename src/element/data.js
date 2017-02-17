import curry from 'lodash/fp/curry'
import prop from 'lodash/fp/prop'

export default curry((key, el) => { // eslint-disable-line id-blacklist
  const value = prop(`dataset.${key}`, el)
  return value !== undefined ? value : null
})
