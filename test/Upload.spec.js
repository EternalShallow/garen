import { shallowMount, mount } from '@vue/test-utils'
import Upload from '../src/components/upload'
import chai, { expect } from 'chai'
import { createEvent } from './utils'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

describe('Upload', () => {
  it('props有效', () => {
    const wrapper = mount(Upload, {
      propsData: {
        accept:'测试image/*',  // 调用相机对应input accept选项
        capture:'测试camera',  // 对应input capture选项
        multiple:true,  // 非多选
      }
    })
    const vm = wrapper.vm
    const input = vm.$refs.garenUpload
    expect(input.getAttribute('accept')).to.equal('测试image/*')
    expect(input.getAttribute('capture')).to.equal('测试camera')
    expect(input.getAttribute('multiple')).to.equal('multiple')
  })

  it('change有效', () => {
    const wrapper = mount(Upload)
    const vm = wrapper.vm
    const input = vm.$refs.garenUpload

    const change = createEvent('change')
    change.files = 'files'

    input.addEventListener('change', function (e) {
      setTimeout(() => {
        expect(wrapper.emitted()['change'][0][0]).to.be.equal('files')
        done()
      }, 0)
    }, false);
    input.dispatchEvent(change)
  })
})
