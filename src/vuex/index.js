import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // host: '/p/10/0/5/107/6894/ormrpc/RestServer', // 10.0.5.107:6894
        // bzhost: '/p/10/75/1/215/8080', // '/p/10/75/60/167/8888',
        // bzImg: '/p/10/75/1/215/8080/operation/upload/',
        // helphost: '/vank/',
        // tokenhost: '/p/172/31/1/145/8101/',
        // weixinhost: 'https://qyapi.weixin.qq.com',
        host: 'http://10.0.5.164:6888/ormrpc/RestServer', // 10.0.5.107:6894
        bzhost: 'http://10.75.1.215:8080', // 'http://10.75.60.27:8888'
        bzImg: 'http://10.75.1.215:8080/operation/upload/',
        helphost: 'http://t1.vanke.com:6888/vank/', // 'http://agthl.com/vank/', // 101.200.50.251.80
        tokenhost: 'http://172.31.1.145:8101',
        weixinhost: 'https://qyapi.weixin.qq.com',
        sessionId: window.sessionStorage.getItem('sessionId') || '',
        userNum: window.localStorage.getItem('userNum') || 'leixc', // leixc
        avatar: window.localStorage.getItem('avatar') || '',
        title: window.sessionStorage.getItem('pageTitle') || '个人中心'
    },
    mutations: {
        sessionId(state, info) {
            state.sessionId = info;
            window.sessionStorage.setItem('sessionId', info);
        },
        setTitle(state, info) {
            state.title = info;
            window.sessionStorage.setItem('pageTitle', info);
        },
        userNum(state, info) {
            window.localStorage.setItem('userNum', info);
        },
        avatar(state, info) {
            window.localStorage.setItem('avatar', info);
        }
    }
});
