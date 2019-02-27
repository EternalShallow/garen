import { shallowMount, mount } from '@vue/test-utils'
import Tabs from '../src/components/tabs'
import TabsItem from '../src/components/tabsItem'
import chai, { expect } from 'chai'
import { createEvent } from './utils'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

describe('Tabs', () => {
  it('title数量', () => {
    const wrapper = mount(Tabs, {
      slots:{
          default:[TabsItem,TabsItem ,TabsItem ]
      }
    })
    const vm = wrapper.vm
    expect(vm.titles.length).to.equal(3)    
  })

  it('点击切换', (done) => {
    const wrapper = mount(Tabs, {
      slots:{
          default:[TabsItem,TabsItem ,TabsItem ]
      }
    })
    const vm = wrapper.vm
   setTimeout(()=>{
    wrapper.findAll('.garen-tabs-title').at(1).trigger('click')
    setTimeout(()=>{
        expect(vm.titleIndex).to.equal(1)
        expect(wrapper.emitted()['change'][0][0]).to.be.equal(1)
        expect(wrapper.findAll('.garen-tabs-title').at(1).classes('garen-tabs-title-active')).to.be.equal(true)
        expect(wrapper.findAll('.garen-tabsItem').at(0).attributes('style')).to.be.equal('display: none;')
        expect(wrapper.findAll('.garen-tabsItem').at(1).attributes('style')).to.be.equal('')
        expect(wrapper.findAll('.garen-tabsItem').at(2).attributes('style')).to.be.equal('display: none;')
        done()
    },0)
   },0)    
  })

  it('handleClick', (done) => {
    const wrapper = mount(Tabs, {
      slots:{
          default:[TabsItem,TabsItem ,TabsItem ]
      }
    })
    const vm = wrapper.vm
   setTimeout(()=>{
    vm.handleClick(1)
    setTimeout(()=>{
        expect(vm.titleIndex).to.equal(1)
        expect(wrapper.emitted()['change'][0][0]).to.be.equal(1)
        expect(wrapper.findAll('.garen-tabs-title').at(1).classes('garen-tabs-title-active')).to.be.equal(true)
        expect(wrapper.findAll('.garen-tabsItem').at(0).attributes('style')).to.be.equal('display: none;')
        expect(wrapper.findAll('.garen-tabsItem').at(1).attributes('style')).to.be.equal('')
        expect(wrapper.findAll('.garen-tabsItem').at(2).attributes('style')).to.be.equal('display: none;')
        done()
    },0)
   },0)    
  })

  it('mockClick', (done) => {
    const wrapper = mount(Tabs, {
      slots:{
          default:[TabsItem,TabsItem ,TabsItem ]
      }
    })
    const vm = wrapper.vm
   setTimeout(()=>{
    vm.mockClick(1)
    setTimeout(()=>{
        expect(vm.titleIndex).to.equal(1)
        expect(wrapper.emitted()['change']).to.be.undefined
        expect(wrapper.findAll('.garen-tabs-title').at(1).classes('garen-tabs-title-active')).to.be.equal(true)
        expect(wrapper.findAll('.garen-tabsItem').at(0).attributes('style')).to.be.equal('display: none;')
        expect(wrapper.findAll('.garen-tabsItem').at(1).attributes('style')).to.be.equal('')
        expect(wrapper.findAll('.garen-tabsItem').at(2).attributes('style')).to.be.equal('display: none;')
        done()
    },0)
   },0)    
  })
})
