import { closest } from './Element'

export default function onlyIf(selector, handler, options = {}){
  return e => {
    if(
      options.not &&
      closest(options.not, e.currentTarget, e.target)
    ){
      return
    }

    const target = closest(selector, e.currentTarget, e.target)
    if(target){
      handler(e, target)
    }
  }
}
