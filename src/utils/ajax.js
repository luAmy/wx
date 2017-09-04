import Vue from 'vue';
import axios from 'axios';
import { Indicator, Toast } from 'mint-ui';

function comErrorCallback(error) {
    console.log('comErrorCallback>>>>>', error);
    Toast({message: '网络错误', duration: 2000});
}
// function comCodeToast(code) {
//     var msgObj = {};
//     Toast({message:msgObj[code]?msgObj[code]:'系统异常', duration: 2000})
// }
var ajax = {
    get(url, params, isComCodeToast) {
        Indicator.open({
            text: '加载中...',
            spinnerType: 'snake'
        });
        return new Promise((resolve, reject) => {
            axios.get(url, params).then(response => {
                console.log(url + '>>>>>>', response.data);
                if (response.status === 200) {
                    Indicator.close();
                    if (isComCodeToast) {
                        resolve(response);
                        return;
                    }
                    resolve(response);
                    // if (response.data.code === '000000'){
                    //   resolve(response)
                    // } else {
                    //   comCodeToast(response.data.code)
                    // }
                } else {
                    Indicator.close();
                    comErrorCallback(response);
                }
            }).catch((error) => {
                Indicator.close();
                if (reject) {
                    reject(error);
                } else {
                    comErrorCallback(error);
                }
            });
        });
    },
    post(url, params, isComCodeToast) {
        Indicator.open({
            text: '加载中...',
            spinnerType: 'snake'
        });
        return new Promise((resolve, reject) => {
            axios.post(url, {
                // params: params,
                headers: {
                    'contentType': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            }).then(response => {
                console.log(url + '>>>>>>', response.data);
                if (response.status === 200) {
                    Indicator.close();
                    if (isComCodeToast) {
                        resolve(response);
                        return;
                    }
                    resolve(response);
                    // if (response.data.code === '000000') {
                    //     resolve(response);
                    // } else {
                    //     comCodeToast(response.data.code);
                    // }
                } else {
                    Indicator.close();
                    comErrorCallback(response);
                }
            }).catch((error) => {
                Indicator.close();
                if (reject) {
                    reject(error);
                } else {
                    comErrorCallback(error);
                }
            });
        });
    }
};
export default{
    install: () => {
        Vue.prototype.$http = ajax;
    }
};
