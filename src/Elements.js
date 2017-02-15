import flatten from 'lodash/fp/flatten'
import _filter from 'lodash/fp/filter'
import uniq from 'lodash/fp/uniq'
import map from 'lodash/fp/map'
import compact from 'lodash/fp/compact'
import flow from 'lodash/fp/flow'
import _remove from 'lodash/fp/remove'
import some from 'lodash/fp/some'
import prop from 'lodash/fp/prop'
import identity from 'lodash/fp/identity'

import * as Element from './Element'

export const has = (elements, selection) => _filter(
  Element.has(selection),
  elements
)

export const find = (elements, selection) => flow(
  map(Element.find(selection)),
  flatten,
  uniq
)(elements)

export const remove = (elements, selection) => _remove(
  Element.matches(selection),
  elements
)

export const filter = (elements, selection) => {
  if(!selection){
    return [...elements]
  }

  return _filter(
    Element.matches(selection),
    elements
  )
}

export const siblings = (elements, selection) => flow(
  map(Element.siblings(selection)),
  flatten,
  uniq
)(elements)

export const next = flow(
  map(Element.next),
  compact
)

export const nextAll = flow(
  map(Element.nextAll),
  flatten,
  uniq
)

export const prev = flow(
  map(Element.prev),
  compact
)

export const prevAll = flow(
  map(Element.prevAll),
  flatten,
  uniq
)

export const closest = (elements, selection, scopeEl) => flow(
  map(Element.closest(selection, scopeEl)),
  compact,
  uniq
)(elements)

export const parents = (elements, selection) => flow(
  map(prop('parentElement')),
  compact,
  uniq,
  filter(selection ? Element.matches(selection) : identity)
)(elements)

export const ancestors = (elements, selection, scopeEl) => flow(
  map(Element.ancestors(selection, scopeEl)),
  flatten,
  uniq
)(elements)

export const children = (elements, selection) => flow(
  map(Element.children(selection)),
  flatten
)(elements)

export const is = (elements, selection) => some(
  Element.matches(selection),
  elements
)
