import { createStore, createLogger } from 'vuex'
import theme from './modules/theme'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    theme
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
