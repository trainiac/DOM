import DOM from './DOM'

export default function onlyIf(selector, handler, options = {}){
  return e => {
    if(
      options.not &&
      DOM(e.target).closest(options.not, e.currentTarget).size() > 0
    ){
      return
    }

    const target = DOM(e.target).closest(selector, e.currentTarget).element()
    if(target){
      handler(e, target)
    }
  }
}
