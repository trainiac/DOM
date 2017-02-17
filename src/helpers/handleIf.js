import closest from '../element/closest'

export default function handleIf (selection, handler, options = {}) {
  return e => {
    if (
      options.not &&
      closest(options.not, e.currentTarget, e.target)
    ) {
      return
    }

    const target = closest(selection, e.currentTarget, e.target)
    if (target) {
      handler(e, target)
    }
  }
}
