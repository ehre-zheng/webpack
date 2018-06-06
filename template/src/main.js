{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
{{#vuex}}  //vuex为true的时候就会写入这些
import store from './store'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/vuex}}
{{#wechatConfig}}
import VueWechatTitle from 'vue-wechat-title'
import Wechat from '@/assets/js/wechat.js'
{{/wechatConfig}}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#vuex}}
   store,
  {{/vuex}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})


  {{#router}}
// 导航钩子主要用来拦截导航，让它完成跳转或取消
router.beforeEach((to, from, next) => {
  //console.log("store",store.state)
  //   console.log(from)
  // 在页面跳转前判断采用哪种过度效果
  let routeLength = store.state.Vuxm.routeChain.length;
  // console.log(store.state.Vuxm.routeChain)
  store.commit('ROUTE_FORM', from.name);
    if (routeLength === 0) {
        store.commit('SET_DIRECTION_NAME', 'slide-left');
        if (to.path === from.path && to.path === '/') {
            //当直接打开根路由的时候
            store.commit('ADD_ROUTE_CHAIN', to);
        } else {
            //直接打开非根路由的时候其实生成了两个路径，from其实就是根路由
            store.commit('ADD_ROUTE_CHAIN', from);
            store.commit('ADD_ROUTE_CHAIN', to);
        }
    } else if (routeLength === 1) {
        store.commit('SET_DIRECTION_NAME', 'slide-left');
        store.commit('ADD_ROUTE_CHAIN', to);
    } else {
        let lastBeforeRoute = store.state.Vuxm.routeChain[routeLength-2];
        // console.log(lastBeforeRoute.path==to.path)
        if (lastBeforeRoute.path === to.path) {
            store.commit('POP_ROUTE_CHAIN');
            store.commit('SET_DIRECTION_NAME', 'slide-right');
        } else {
            store.commit('ADD_ROUTE_CHAIN', to);
            store.commit('SET_DIRECTION_NAME', 'slide-left');
        }
    }
    {{#wechatConfig}}
    isWeChatInit(next)
    // 打开遮罩
    // store.commit('UPDATE_LOADING_STATUS', {isLoading: true})
    // 本地测试  TODO
    //next();
    {{/wechatConfig}}



});

// 导航路由跳转完毕之后
router.afterEach(function (to) {
   window.scrollTo(0, 0);
  // 关闭遮罩
  //store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
})
{{/router}}
{{#wechatConfig}}
function isWeChatInit (next){
 if(!Wechat.isInitialization){
    Wechat.weConfig(function(){
      Wechat.hideOptionMenu();
      Wechat.isInitialization = true;
      next()
    });
  } else {
   Wechat.hideOptionMenu();
     next()
  }
}
{{/wechatConfig}}
