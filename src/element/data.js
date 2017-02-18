import { curry } from '../utils'

export default curry((key, el) => { // eslint-disable-line id-blacklist
  let value
  if(el && el.dataset){
    value = el.dataset[key]
  }
  return value !== undefined ? value : null
})
