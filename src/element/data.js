import { curry, prop } from 'lodash/fp'

export default curry((key, el) => { // eslint-disable-line id-blacklist
  const value = prop(`dataset.${key}`, el)
  return value !== undefined ? value : null
})
