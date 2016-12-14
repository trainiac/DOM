import fp from 'lodash/fp'
import * as Element from './Element'

export const has = (elements, selection, scopeEl) => fp.filter(
  Element.has(selection, scopeEl),
  elements
)

export const find = (elements, selection) => fp.flow(
  fp.map(Element.find(selection)),
  fp.flatten,
  fp.uniq
)(elements)

export const remove = (elements, selection) => fp.remove(
  Element.matches(selection),
  elements
)

export const filter = (elements, selection) => fp.filter(
  Element.matches(selection),
  elements
)

export const siblings = (elements, selection) => fp.flow(
  fp.map(Element.siblings(selection)),
  fp.flatten,
  fp.uniq
)(elements)

export const next = fp.flow(
  fp.map(Element.next),
  fp.compact
)

export const nextAll = fp.flow(
  fp.map(Element.nextAll),
  fp.flatten,
  fp.uniq
)

export const prev = fp.flow(
  fp.map(Element.prev),
  fp.compact
)

export const prevAll = fp.flow(
  fp.map(Element.prevAll),
  fp.flatten,
  fp.uniq
)

export const closest = (elements, selection, scopeEl) => fp.flow(
  fp.map(Element.closest(selection, scopeEl)),
  fp.compact,
  fp.uniq
)(elements)

export const parents = (elements, selection) => fp.flow(
  fp.map(fp.prop('parentElement')),
  fp.compact,
  fp.uniq,
  fp.filter(selection ? Element.matches(selection) : fp.identity)
)(elements)

export const ancestors = (elements, selection, scopeEl) => fp.flow(
  fp.map(Element.ancestors(selection, scopeEl)),
  fp.flatten,
  fp.uniq
)(elements)

export const children = (elements, selection) => fp.map(
  Element.children(selection),
  elements
)

export const is = (elements, selection) => fp.some(
  Element.matches(selection),
  elements
)
