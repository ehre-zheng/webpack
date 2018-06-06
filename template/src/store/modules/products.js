import * as types from '../mutation-types'
import Sesskr from '@/assets/js/sesskr.js'
// initial state
let state = {
  // 投保人信息
  appnt:{},
  insureds:[{ // 被保人信息
    bnfList:[], // 受益人信息
    insuranceList:[] // 险种信息
  }],
  order:{},// 订单信息
  orderSalesList:{},//订单销售人员模型
  cvaliDate:'',//起保时间
  endDate:'',//终保时间
  anXinTable:[],
  xueziTable:[],
  question:{},
  health:{},
  insuredsHealth:{},
  finance:{},
  insuredsfinance:{},
  anXinDetail:{},
  xueZiDetail:{},
  payData:{},
  orderNo:''
}

if(Sesskr.get("state.Products")){
   state = Sesskr.get("state.Products");
}

const getters =  {
  // nickname: state => {
  //   return state.name + state.certNum
  // },
  // applicant:state=>state.applicant
}

// actions
const actions = {
  //保存投保人信息
  SAVE_PRODUCT({ commit },product){
    commit(types.SAVE_PRODUCT,product)
  },
  SAVE_CVALIDATE({ commit },cvaliDate){
    commit(types.SAVE_CVALIDATE,cvaliDate)
  },
  SAVE_ENDDATE({ commit },endDate){
    commit(types.SAVE_ENDDATE,endDate)
  },
  SAVE_ANXINTABLE({ commit },anXinTable){
    commit(types.SAVE_ANXINTABLE,anXinTable)
  },
  SAVE_XUEZITABLE({ commit },xueziTable){
    commit(types.SAVE_XUEZITABLE,xueziTable)
  },
  SAVE_QUESTION({ commit },question){
    commit(types.SAVE_QUESTION,question)
  },
  SAVE_HEALTH({ commit },health){
    commit(types.SAVE_HEALTH,health)
  },
  SAVE_INSUREDSHEALTH({ commit },insuredsHealth){
    commit(types.SAVE_INSUREDSHEALTH,insuredsHealth)
  },
  SAVE_FINANCE({ commit },finance){
    commit(types.SAVE_FINANCE,finance)
  },
  SAVE_INSUREDSFINANCE({ commit },insuredsfinance){
    commit(types.SAVE_INSUREDSFINANCE,insuredsfinance)
  },
  SAVE_ANXINDETAIL({ commit },anXinDetail){
    commit(types.SAVE_ANXINDETAIL,anXinDetail)
  },
  SAVE_XUEZIDETAIL({ commit },xueZiDetail){
    commit(types.SAVE_XUEZIDETAIL,xueZiDetail)
  },
  SAVE_PAYDATA({ commit },payData){
    commit(types.SAVE_PAYDATA,payData)
  },
  SAVE_ORDERNO({ commit },orderNo){
    commit(types.SAVE_ORDERNO,orderNo)
  }
  // SAVE_CARINFO({ commit },car){
  //   commit(types.SAVE_CARINFO,car)
  // },

  // MODIFY_INSTRUE({ commit },{name}){
  //   commit(types.MODIFY_INSTRUE,{name})
  // },
  // DEL_APPLICANT({ commit }){
  //   commit(types.DEL_APPLICANT)
  // },
  // SAVE_USERINFO({ commit },info){
  //   commit(types.SAVE_USERINFO,info)
  // },
  // SAVE_BANKINFO({ commit },bank){
  //   commit(types.SAVE_BANKINFO,bank)
  // },
}

// mutations
const mutations = {
  // 保存投保人信息
  // [types.SAVE_APPLICANT](state,applicant){
  //   state.applicant = applicant;
  //    Sesskr.set("state.Products",state);
  // },
  // [types.SAVE_INSURANT](state,insurant){
  //   state.insurant = insurant;
  //    Sesskr.set("state.Products",state);
  // },
  [types.SAVE_PRODUCT](state,product){
    state.appnt = product.appnt;
    state.insureds = product.insureds;
    state.order = product.order;
    state.orderSalesList = product.orderSalesList;
    Sesskr.set("state.Products",state);
  },
  [types.SAVE_CVALIDATE](state,cvaliDate){
    state.cvaliDate = cvaliDate;
    Sesskr.set("state.Products",state);
  },
  [types.SAVE_ENDDATE](state,endDate){
    state.endDate = endDate;
    Sesskr.set("state.Products",state);
  },
  [types.SAVE_ANXINTABLE](state,anXinTable){
    state.anXinTable = anXinTable;
    Sesskr.set("state.Products",state);
  },
  [types.SAVE_XUEZITABLE](state,xueziTable){
    state.xueziTable = xueziTable;
    Sesskr.set("state.Products",state);
  },
  [types.SAVE_QUESTION](state,question){
    state.question = question;
    Sesskr.set("state.Products",state);
  },
  [types.SAVE_HEALTH](state,health){
    state.health = health;
    Sesskr.set("state.Products",state);
  },
  [types.SAVE_INSUREDSHEALTH](state,insuredsHealth){
    state.insuredsHealth = insuredsHealth;
    Sesskr.set("state.Products",state);
  },
  [types.SAVE_FINANCE](state,finance){
    state.finance = finance;
    Sesskr.set("state.Products",state);
  },
  [types.SAVE_INSUREDSFINANCE](state,insuredsfinance){
    state.insuredsfinance = insuredsfinance;
    Sesskr.set("state.Products",state);
  },
  [types.SAVE_ANXINDETAIL](state,anXinDetail){
    state.anXinDetail = anXinDetail;
    Sesskr.set("state.Products",state);
  },
  [types.SAVE_XUEZIDETAIL](state,xueZiDetail){
    state.xueZiDetail = xueZiDetail;
    Sesskr.set("state.Products",state);
  },
  [types.SAVE_PAYDATA](state,payData){
    state.payData = payData;
    Sesskr.set("state.Products",state);
  },
  [types.SAVE_ORDERNO](state,orderNo){
    state.orderNo = orderNo;
    Sesskr.set("state.Products",state);
  }
  // [types.SAVE_CARINFO](state,car){
  //   state.car = car;
  //    Sesskr.set("state.Products",state);
  // },
  // [types.SAVE_USERINFO](state,info){
  //   state.userInfo = info;
  //    Sesskr.set("state.Products",state);
  // },
  // [types.SAVE_BANKINFO](state,bank){
  //   state.bank = bank;
  //   Sesskr.set("state.Products",state);
  //},
}

export default {
  state,
  getters,
  actions,
  mutations
}
