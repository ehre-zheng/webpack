import * as types from '../mutation-types'
// initial state
let state = {
   routeChain:[], // 路由链
   transitionName: 'slide-left' ,
	 isLoading: false,
   isAlertShow: false,
   toastShow:{
    isToastShow:false,
    errorMsg:""
   },
   alertText: "", // alert的提示内容
   isConfirmShow: false,
   confirmText: "",
   errorMsg:"",
    routeForm:''
};

// actions
const actions = {
  ADD_ROUTE_CHAIN({ commit },opt){
    commit(types.ADD_ROUTE_CHAIN,opt)
  },
  POP_ROUTE_CHAIN({ commit }){
    commit(types.POP_ROUTE_CHAIN,opt)
  },
  SET_DIRECTION_NAME({ commit },opt){
    commit(types.SET_DIRECTION_NAME,opt)
  },

  UPDATE_LOADING_STATUS({ commit },opt){
    commit(types.UPDATE_LOADING_STATUS,opt)
  },
  UPDATE_ALERT_STATUS({ commit },opt){
    commit(types.UPDATE_ALERT_STATUS,opt)
  },
  UPDATE_CONFIRM_STATUS({ commit },opt){
    commit(types.UPDATE_CONFIRM_STATUS,opt)
  },
  TOAST_MSG({ commit },opt){
    commit(types.TOAST_MSG,opt)
  },
  ROUTE_FORM({ commit },opt){
    commit(types.ROUTE_FORM,opt)
  }

}

// mutations
const mutations = {
  // 添加路由链
  [types.ADD_ROUTE_CHAIN](state, opt){
      state.routeChain.push(opt);
  },
  // 删除路由链
 [types.POP_ROUTE_CHAIN](state){
      state.routeChain.pop();
  },
  [types.ROUTE_FORM](state,opt){
    state.routeForm = opt;
  },
  // 设置路由链过渡样式
  [types.SET_DIRECTION_NAME](state, opt){
      state.transitionName = opt;
  },
  [types.UPDATE_LOADING_STATUS](state,opt){
    console.log(opt)
    state.isLoading = opt.isLoading
  },
  [types.UPDATE_ALERT_STATUS](state,opt){
    state.isAlertShow = opt.isAlertShow
    state.alertText = opt.alertText
  },
  [types.UPDATE_CONFIRM_STATUS](state,opt){
    state.isConfirmShow = opt.isConfirmShow
    state.confirmText = opt.confirmText
  },
  [types.TOAST_MSG](state,errorMsg){
    state.toastShow.isToastShow = true;
    state.toastShow.errorMsg = errorMsg;
  }
};

export default {
  state,
  actions,
  mutations
}
