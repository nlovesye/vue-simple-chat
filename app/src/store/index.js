import Vue from 'vue'
import Vuex from 'vuex'
/* moduls */
import index from './modules/index'
import login from './modules/login'
import admin from './modules/admin'
/* moduls */
import { routes } from '@router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version: '0.0.1',
    allRouters: routes || []
  },
  getters: {
    getChildRouter: state => name => state.allRouters.find(rt => rt.name === name) ? (state.allRouters.find(rt => rt.name === name).children || []) : []
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    index,
    login,
    admin
  }
})
