/*
 * @Author       : Seaming
 * @Date         : 2023-01-19
 * @LastEditors  : Seaming
 * @LastEditTime : 2023-01-20
 * @FilePath     : /My_Blog/src/store/modules/theme.js
 * @Description  : 全局设置主题模式, state => 深色主题:'dark'  亮色主题:'white'
 *                 'white'
 *
 * Copyright (c) 2023 by Seaming 87215099+SMingC@users.noreply.github.com, All Rights Reserved.
 */

import { THEME_STORE } from '../constant'

const initialModel = localStorage.getItem('themeModel')

const state = () => ({
  isDarkModel: initialModel ? initialModel : 'dark'
})

const getters = {
  getModel: state => state.isDarkModel
}

const actions = {
  setDarkModel({ commit }, modelStr) {
    commit(THEME_STORE.SET_DARK_MODEL, modelStr)
  },
  setWhiteModel({ commit }, modelStr) {
    commit(THEME_STORE.SET_WHITE_MODEL, modelStr)
  }
}

const mutations = {
  setDarkModel(state, payload) {
    state.isDarkModel = payload
    localStorage.setItem('themeModel', payload)
  },
  setWhiteModel(state, payload) {
    state.isDarkModel = payload
    localStorage.setItem('themeModel', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
