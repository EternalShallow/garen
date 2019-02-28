import { shallowMount, mount } from '@vue/test-utils'
import Cropper from '../src/components/cropper'
import chai, { expect } from 'chai'
import { createEvent } from './utils'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {base64} from './base64'
chai.use(sinonChai)

describe('Cropper', () => {
  it('截图有效', (done) => {
    const wrapper = mount(Cropper, {
      propsData: {
        imgType:'jpeg',
        imgSrc:base64
      }
    })
    const vm = wrapper.vm
    vm.$el.style.height = '700px'
    vm.$el.style.width = '375px'
    
    setTimeout(()=>{
        vm.init()
        setTimeout(()=>{
            vm.width = 375;
            vm.height = 700;
            vm.confirm()
            setTimeout(() => {
                expect(wrapper.emitted()['finish'][0][0]).to.not.be.undefined
                done()
              }, 0)
        },0)
    },0)
  })
})
