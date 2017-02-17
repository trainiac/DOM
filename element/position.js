export default function position(el){
  if(!el){
    return null
  }

  const rect = el.getBoundingClientRect()

  return {
    top: rect.top + window.pageXOffset,
    left: rect.left + window.pageYOffset,
    offsetParent: el.offsetParent,
    offsetLeft: el.offsetLeft,
    offsetRight: el.offsetRight,
    scrollTop: el.scrollTop,
    scrollLeft: el.scrollLeft
  }
}
