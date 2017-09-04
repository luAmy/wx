<template>
    <div id="app">
        <!--<header class="clear header" v-if="title && title!=='个人中心' && title!=='视频'-->
        <!--&& title!=='小贴士' && title!=='攻略集锦'">-->
            <!--<div :style="{backgroundImage: 'url('+ arrowLeft +')'}" class="arrow fl" @click="$router.go(-1)"></div>-->
            <!--<span class="text">{{title}}</span>-->
        <!--</header>-->
        <router-view class="container" :class="{hasHeader: title && title!=='个人中心' && title!=='视频'
        && title!=='小贴士' && title!=='攻略集锦'}"></router-view>
        <!--<loading v-model="isLoading"></loading>-->
    </div>
</template>

<script>
    import 'normalize.css';
    import './css/common.less';
    import './css/mint-ui.less';
    import {mapState} from 'vuex';
//    import axios from 'axios';
    import wx from 'weixin-js-sdk';

    export default {
        name: 'app',
        components: {
        },
        data() {
            return {
                arrowLeft: require('./img/arrow-left.png'),
                noncestr: '',
                signature: '',
                jsapiTicket: '',
                url: '',
                timestamp: ''
            };
        },
        computed: {
            ...mapState({
                isLoading: state => state.isLoading,
                title: state => state.title
            })
        },
        methods: {
            weixin() {
                var url = this.HELPHOST + 'help_video/js_sign.do';

                this.$http.get(url).then(res => {
                    var data = res.data.data;
                    this.noncestr = data.noncestr;
                    this.signature = data.sign;
                    this.jsapiTicket = data.jsapiTicket;
                    this.url = data.url;
                    this.timestamp = data.timestamp;

                    this.weixinConfig();
                });
            },
            weixinConfig() {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wx45362d8e0247a7c7', // 必填，企业号的唯一标识，此处填写企业号corpid
                    timestamp: this.timestamp, // 必填，生成签名的时间戳
                    nonceStr: this.noncestr, // 必填，生成签名的随机串
                    signature: this.signature, // 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage',
                        'onMenuShareQQ', 'previewImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            }
        },
        created() {
            window.sessionStorage.setItem('first', true);
            this.weixin();
        },
        watch: {
            '$route' (to, from) {
                if (this.signature) {
                    this.weixinConfig();
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    .header {
        position: absolute;
        width: 100%;
        padding: .25rem .28rem;
        z-index: 99999;
        color: #fff;
        text-align: center;
        font-size: .32rem;
        background-color: #1c1c20;
        box-sizing: border-box;
        .arrow {
            position: absolute;
            width: .86rem;
            height: .86rem;
            background-size: .18rem .34rem;
            background-repeat: no-repeat;
        }
    }
    .container.hasHeader {
        padding-top: .86rem;
    }
</style>
