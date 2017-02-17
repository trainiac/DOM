export default function dimensions(el){
  if(!el){
    return null
  }

  const rect = el.getBoundingClientRect()

  return {
    innerWidth: el.clientWidth,
    innerHeight: el.clientHeight,
    scrollWidth: el.scrollWidth,
    scrollHeight: el.scrollHeight,
    nonTransformWidth: el.offsetWidth,
    nonTransformHeight: el.offsetHeight,
    height: rect.height,  // only different from offset when transform applied
    width: rect.width     // only different from offset when transform applied
  }
}
