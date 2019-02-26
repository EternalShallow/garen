import { shallowMount,mount } from '@vue/test-utils'
import Loadmore from '../src/components/loadmore'
import {expect} from 'chai'
import {createEvent} from './utils'


describe('Loadmore', () => {
  const wrapper = mount(Loadmore)
  const vm = wrapper.vm
  it('pulling状态改变pulling', (done) => {
    
  })

  it('pulling状态改变limit', (done) => {
    const touchmove = createEvent('touchmove')
    touchmove.touches = [{screenY:200}]
    const content = vm.$refs.content
    content.addEventListener('touchmove', function (e) { 
      expect(vm.topStatus).to.equal('limit')
      done()
    }, false);
    content.dispatchEvent(touchmove)
  })

  it('pulling状态改变loading', (done) => {

  })

  it('pulling状态改变complete', (done) => {

  })
})
