import * as types from '../mutation-types'
import Sesskr from '@/assets/js/sesskr.js'
// initial state
console.log(Sesskr.get("state.User"))
let state = {
  userInfo: {
    agentCode:"", // 销售人员编码
    idNo:"", // 销售人员证件号
    name:"", // 销售人员姓名
    openId:"", // openId
    roleType:"", // 角色类型 目前只有客户经理即固定传1
    projectCode:"",// 项目编码
    projectName:"",// 项目名称
    teamCode:"",// 项目组编码
  }, //用户信息
  isLogin: false
};
if(Sesskr.get("state.User")){
  state = Sesskr.get("state.User");
}
// actions
const actions = {
  // 保存用户信息
  SAVE_USERINFO({ commit },info){
    commit(types.SAVE_USERINFO,info)
  },  
  // 退出登录
  OUT_LOGIN({ commit }){
    commit(types.OUT_LOGIN)
  },
  // 保存企业编码信息
  SAVE_GROUPINFO({ commit },info){
    commit(types.SAVE_GROUPINFO)
  }
}

// mutations
const mutations = {
  // 保存用户信息
  [types.SAVE_USERINFO](state,info){
    state.userInfo = Object.assign(state.userInfo, info);// 浅拷贝、对象属性的合并
    state.isLogin = true;
    Sesskr.set("state.User",state);
  },

  //退出登录
	[types.OUT_LOGIN](state, info) {
		state.userInfo = {};
		state.isLogin = false;
    Sesskr.set("state.User",state);
	}

	//获取用户信息存入vuex
	// [types.GET_USERINFO](state, info) {
	// 	if (state.userInfo && (state.userInfo.username !== info.username)) {
	// 		return;
	// 	};
	// 	if (!state.login) {
	// 		return
	// 	}
	// 	if (!info.message) {
	// 		state.userInfo = {...info};
	// 	} else {
	// 		state.userInfo = null;
	// 	}
 //    Sesskr.set("state.User",state);
    // state.userInfo = Object.assign({}, state.userInfo,{username}) // 浅拷贝、对象属性的合并
  //   Sesskr.set("state.User",state);
	// },
	// 保存企业编码信息
	// [types.SAVE_GROUPINFO](state,info) {
 //    state.orderSales = Object.assign(state.orderSales, info);// 浅拷贝、对象属性的合并
 //    Sesskr.set("state.User",state);
	// }

};

export default {
  state,
  actions,
  mutations
}
