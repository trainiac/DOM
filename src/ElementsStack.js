import fp from 'lodash/fp'
import * as Elements from './Elements'
import * as Element from './Element'

export default class ElementsStack {

  constructor(selection){
    this.stack = []
    if(fp.isElement(selection)){
      this.stack.push([selection])
    }else if(fp.isString(selection)){
      this.stack.push(Element.find(selection, document))
    }
  }

  element(index = 0){
    return fp.nth(index, this.elements())
  }
  elements(){
    return fp.nth(-1, this.stack) || []
  }

  size(){
    return this.elements().length
  }

  index(el){
    return fp.indexOf(el, this.elements())
  }

  is(selection){
    return Elements.is(this.elements(), selection)
  }

  // first elemet information methods

  data(key){  // eslint-disable-line id-blacklist
    return Element.data(this.element(), key)
  }

  dimensions(){
    return Element.dimensions(this.element())
  }

  position(){
    return Element.position(this.element())
  }

  positionRelativeTo(el){
    return Element.positionRelativeTo(this.element(), el)
  }

  // chainable methods

  end(){
    this.stack.pop()
    return this
  }

  // access current selected elements

  eq(index){
    const element = this.element(index)
    const elements = element ? [ element ] : []
    this.stack.push(elements)
    return this
  }

  first(){
    const element = this.element()
    const elements = element ? [ element ] : []
    this.stack.push(elements)
    return this
  }

  last(){
    const element = this.element(-1)
    const elements = element ? [ element ] : []
    this.stack.push(elements)
    return this
  }

  slice(...args){
    const elements = this.elements().slice(...args)
    this.stack.push(elements)
    return this
  }

  // siblings methods

  siblings(selection){
    const elements = Elements.siblings(this.elements(), selection)
    this.stack.push(elements)
    return this
  }

  next(){
    const elements = Elements.next(this.elements()) // eslint-disable-line callback-return
    this.stack.push(elements)
    return this
  }

  nextAll(){
    const elements = Elements.nextAll(this.elements())
    this.stack.push(elements)
    return this
  }

  prev(){
    const elements = Elements.prev(this.elements())
    this.stack.push(elements)
    return this
  }

  prevAll(){
    const elements = Elements.prevAll(this.elements())
    this.stack.push(elements)
    return this
  }

  // ancestor methods

  closest(selection, scopeEl){
    const elements = Elements.closest(this.elements(), selection, scopeEl)
    this.stack.push(elements)
    return this
  }

  parents(selection){
    const elements = Elements.parents(this.elements(), selection)
    this.stack.push(elements)
    return this
  }

  ancestors(selection, scopeEl){
    const elements = Elements.ancestors(this.elements(), selection, scopeEl)
    this.stack.push(elements)
    return this
  }

  // descendant accessors

  children(selection){
    const elements = Elements.children(this.elements(), selection)
    this.stack.push(elements)
    return this
  }

  find(selection){
    const elements = Elements.find(this.elements(), selection)
    this.stack.push(elements)
    return this
  }

  // filter methods

  has(selection){
    const elements = Elements.has(this.elements(), selection)
    this.stack.push(elements)
    return this
  }

  not(selection){
    const elements = Elements.remove(this.elements(), selection)
    this.stack.push(elements)
    return this
  }

  filter(selection){
    const elements = Elements.filter(this.elements(), selection)
    this.stack.push(elements)
    return this
  }

}
