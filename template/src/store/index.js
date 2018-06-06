import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import Vuxm from './modules/vuxm'
import Products from './modules/products'

Vue.use(Vuex)
// const state = {
//   mobile: '13898982819'
// }
//const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  //state,
  modules: {
    Products,
    User,
    Vuxm
  }
})
