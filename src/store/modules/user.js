/*
 * @Author       : Seaming
 * @Date         : 2023-01-25
 * @LastEditors  : Seaming
 * @LastEditTime : 2023-01-26
 * @FilePath     : /BBlog/src/store/modules/user.js
 * @Description  : 保存user
 *
 * Copyright (c) 2023 by Seaming 87215099+SMingC@users.noreply.github.com, All Rights Reserved.
 */

import { USER_STORE } from '../constant'

const state = () => ({
  currentUser: null
})

const getters = {
  getCurrentUser: state => state.currentUser
}

const actions = {
  setCurrentUser({ commit }, user) {
    commit(USER_STORE.SET_CURRENT_USER, user)
  }
}

const mutations = {
  setCurrentUser(state, payload) {
    state.currentUser = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
