import { createStore, createLogger } from 'vuex'
import theme from './modules/theme'
import user from './modules/user'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    theme,
    user
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
