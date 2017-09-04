// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './vuex';
import {remChange} from './utils/remChange';
import ajax from './utils/ajax';
import './utils/filter';
import './utils/variables';
import { Indicator, InfiniteScroll } from 'mint-ui';

remChange();
Vue.use(ajax);
Vue.use(InfiniteScroll);

Vue.config.productionTip = false;

/** loading and page title **/
router.beforeEach(function(to, from, next) {
    if (to.meta.pageTitle === '列表') {
        document.title = window.localStorage.getItem('billname');
    } else if (to.meta.pageTitle === '详情') {
        document.title = window.localStorage.getItem('billname') + '详情';
    } else {
        document.title = to.meta.pageTitle ? to.meta.pageTitle : '个人中心';
    }
    if (to.query.billname) {
        document.title = to.query.billname + '详情';
    }
    next();
});
router.afterEach(function(to) {
    Indicator.close();
    // store.commit('updateLoadingStatus', {isLoading: false});
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
});
