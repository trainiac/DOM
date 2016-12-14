import fp from 'lodash/fp'
import * as Elements from './Elements'
import * as Element from './Element'


// TODO
// Could implement
//   .next(selection) gets one node that matches the selection
//   .nextUntil(el, filter) gets all until el with option to filter
//   .prev(selection) gets one node that matches the selection
//   .prevUntil(el, filter) gets all until el with option to filter

export default class ElementsStack {

  constructor(selection){
    this.stack = []
    if(fp.isElement(selection)){
      this.stack = [ [selection] ]
    }else if(fp.isString(selection)){
      this.stack = [ Element.find(selection, document) ]
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

  data(key){  // eslint-disable-line id-blacklist
    return Element.data(this.element(), key)
  }

  dimensions(){
    return Element.dimensions(this.element())
  }

  position(){
    return Element.position(this.element())
  }

  positonRelativeTo(el){
    return Element.positonRelativeTo(this.element(), el)
  }

  index(el){
    return fp.indexOf(el, this.elements())
  }

  is(selection){
    return Elements.is(this.elements(), selection)
  }

  // chainable methods

  end(){
    this.stack = fp.initial(this.stack)
    return this
  }

  eq(index){
    const element = this.element(index)
    const elements = element ? [ element ] : []
    this.stack = [ ...this.stack, elements ]
    return this
  }

  first(){
    const element = this.element()
    const elements = element ? [ element ] : []
    this.stack = [ ...this.stack, elements ]
    return this
  }

  last(){
    const element = this.element(-1)
    const elements = element ? [ element ] : []
    this.stack = [ ...this.stack, elements ]
    return this
  }

  has(selection, scopeEl){
    const elements = Elements.has(this.elements(), selection, scopeEl)
    this.stack = [ ...this.stack, elements ]
    return this
  }

  slice(args){
    const elements = this.elements().slice(...args)
    this.stack = [ ...this.stack, elements ]
    return this
  }

  siblings(selection){
    const elements = Elements.siblings(this.elements(), selection)
    this.stack = [ ...this.stack, elements ]
    return this
  }

  next(){
    const elements = Elements.next(this.elements()) // eslint-disable-line callback-return
    this.stack = [ ...this.stack, elements ]
    return this
  }

  nextAll(){
    const elements = Elements.nextAll(this.elements())
    this.stack = [ ...this.stack, elements ]
    return this
  }

  prev(){
    const elements = Elements.prev(this.elements())
    this.stack = [ ...this.stack, elements ]
    return this
  }

  prevAll(){
    const elements = Elements.prevAll(this.elements())
    this.stack = [ ...this.stack, elements ]
    return this
  }

  closest(selection, scopeEl){
    const elements = Elements.closest(this.elements(), selection, scopeEl)
    this.stack = [ ...this.stack, elements ]
    return this
  }

  children(selection){
    const elements = Elements.children(this.elements(), selection)
    this.stack = [ ...this.stack, elements ]
    return this
  }

  not(selection){
    const elements = Elements.remove(this.elements(), selection)
    this.stack = [ ...this.stack, elements ]
    return this
  }

  filter(selection){
    const elements = Elements.filter(this.elements(), selection)
    this.stack = [ ...this.stack, elements ]
    return this
  }

  find(selection){
    const elements = Elements.find(this.elements(), selection)
    this.stack = [ ...this.stack, elements ]
    return this
  }

  parents(selection){
    const elements = Elements.parents(this.elements(), selection)
    this.stack = [ ...this.stack, elements ]
    return this
  }

  ancestors(selection, scopeEl){
    const elements = Elements.ancestors(this.elements(), selection, scopeEl)
    this.stack = [ ...this.stack, elements ]
    return this
  }
}