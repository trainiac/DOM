
export const curry = func => {
  const length = func.length

  const factory = (...initArgs) => {

    const id = Date.now()

    const collector = prevArgs => (...newArgs) => {

      const totalArgs = [...prevArgs, ...newArgs]
      if(totalArgs.length >= length) {
        return func(...totalArgs)
      }

      return collector(totalArgs)

    }

    return collector([])(...initArgs)
  }

  return factory
}

export const flow = (...funcs) => input => {
  return funcs.reduce((next, func) => {
    return func(next)
  }, input)
}

export const eq = curry((val1, val2) => {
  return val1 === val2
})

export const negate = func => (...args) => !Boolean(func(...args))

export const isString = val => typeof val == 'string'

export const filter = curry((func, arr) => {
  return [...arr].filter(func)
})

export const remove = curry((func, arr) => {
  return [...arr].filter(negate(func))
})

export const map = curry((func, arr) => {
  return [...arr].map(func)
})

export const some = curry((func, arr) => {
  return [...arr].some(func)
})

export const toArray = nodeList => [].slice.call(nodeList)

export const compact = arr => {
  let index = -1
  let resIndex = 0
  const length = arr == null ? 0 : arr.length
  const result = []

  while (++index < length) {
    const value = arr[index]
    if (value) {
      result[resIndex++] = value
    }
  }
  return result
}

export const prop = curry((name, obj) => {
  return obj[name]
})


export const flatten = array => {
  if(!array || !array.length){
    return []
  }

  let index = -1
  const length = array.length
  const result = []

  while (++index < length) {
    const value = array[index]
    if (Array.isArray(value)) {
      let index2 = -1
      const valueLength = value.length
      const offset = result.length
      while (++index2 < valueLength) {
        result[offset + index2] = value[index2]
      }

    } else {
      result[result.length] = value
    }
  }
  return result
}

export const isElement = val => Boolean(val && val.nodeType === 1)

export const findFrom = curry((func, index, arr) => {
  let offset = index - 1
  const length = arr.length
  while (++offset < length) {
    const item = arr[offset]
    if(func(item)) {
      return item
    }
  }
})

export const findFromRight = curry((func, index, arr) => {
  let offset = index + 1
  const length = arr.length
  while (--offset >= 0) {
    const item = arr[offset]
    if(func(item)) {
      return item
    }
  }
})

export const uniq = arr => {
  const result = [];
  let i = -1
  const length = arr.length
  while(++i < length) {
    if(result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }
  return result;
}