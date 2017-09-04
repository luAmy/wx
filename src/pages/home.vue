<template>
    <div class="home">
        <!--蓝色头部-->
        <div class="userinfo">
            <div class="avatar fl" :style="{backgroundImage: 'url('+ avatar +')'}">
            </div>
            <div class="text fl">
                <div class="username">
                    {{userinfo.userName}}
                </div>
                <div class="account">
                    账号：{{userinfo.userNum}}
                </div>
            </div>
            <router-link class="credit" :to="'/mycredit'">
                信用等级:
                <!--<span class="rank" :style="{backgroundImage: 'url('+ starsmall +')'}"></span>-->
                <!--<span class="rank" :style="{backgroundImage: 'url('+ starsmall +')'}"></span>-->
                <span class="rank" :style="{backgroundImage: 'url('+ starsmall +')'}"
                      v-for="i in creditRank" v-if="creditRank"></span>
                <img :src="arrow" class="arrow">
            </router-link>
        </div>
        <!--我的报销-->
        <div class="baoxiao card">
            <div class="top clear line ">
                <div class="text fl">
                    我的报销
                </div>
                <router-link class="sub arrow fr" :to="'/mybaoxiao?index=0'">
                    查看全部
                </router-link>
            </div>
            <div class="card-main tx-c clear of-hide">
                <router-link class="item fl" v-for="i in 5" :to="'/mybaoxiao?index=' + i" :key="i">
                    <span class="badge ten" v-if="nums[i-1] > 9">{{nums[i-1]}}</span>
                    <span class="badge" v-else v-show="nums[i-1] > 0">{{nums[i-1]}}</span>
                    <div class="img">
                        <img :src="baoxiao[i-1].img" class="icon">
                    </div>
                    <p class="text">{{baoxiao[i - 1].name}}</p>
                </router-link>
            </div>
        </div>
        <!--常用功能-->
        <div class="common card">
            <div class="top clear line ">
                <div class="text fl">
                    常用功能
                </div>
            </div>
            <div class="card-main tx-c clear of-hide">
                <router-link class="item fl" v-for="i in 5" :to="common[i-1].url"
                             :class="{second:i>4}" :key="i">
                    <div class="img">
                        <img :src="common[i-1].img" class="icon" :class="common[i-1].type">
                    </div>
                    <p class="text">{{common[i - 1].name}}</p>
                </router-link>
            </div>
        </div>
        <!--单据查询-->
        <div class="query card">
            <div class="top clear line ">
                <div class="text fl">
                    单据查询
                </div>
                <router-link class="sub arrow fr" :to="'/billall'">
                    查看全部
                </router-link>
            </div>
            <div class="card-main tx-c clear of-hide">
                <a class="item fl" v-for="i in 8"
                   @click="goToDetail(chaxun[i-1].name, chaxun[i-1].img)"
                   :class="{second:i>4}">
                    <div class="img">
                        <img :src="chaxun[i-1].img" class="icon" :class="chaxun[i-1].type">
                    </div>
                    <p class="text">{{chaxun[i - 1].name}}</p>
                </a>
            </div>
        </div>
        <!--我的发票包-->
        <!--<div class="my-invoice card" @click="$router.push('/invoices')">-->
            <!--<div class="top line">-->
                <!--<img src="../img/invoice-small.png" alt="发票小图">-->
                <!--我的发票包-->
            <!--</div>-->
            <!--<div class="card-main">-->
                <!--<img src="../img/invoice-large.png" alt="发票大图">-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import axios from 'axios';
    import { Indicator } from 'mint-ui'; // Toast

    export default {
        data() {
            return {
                avatar: window.localStorage.getItem('avatar') || '',
                creditBg: require('../img/credit-bg.png'),
                starsmall: require('../img/star-small.png'),
                arrow: require('../img/arrow-small.png'),
                baoxiao: [
                    {
                        name: '未发k2',
                        img: require('../img/baoxiao-weifa.png'),
                        badge: this.num1
                    },
                    {
                        name: '审批中',
                        img: require('../img/baoxiao-shenhe.png'),
                        badge: this.num2
                    },
                    {
                        name: '待付款',
                        img: require('../img/baoxiao-daifukuan.png'),
                        badge: this.num3
                    },
                    {
                        name: '已付款',
                        img: require('../img/baoxiao-yifukuan.png')
                    },
                    {
                        name: '待评价',
                        img: require('../img/baoxiao-daipingjia.png'),
                        badge: this.num5
                    }
                ],
                common: [
                    {
                        name: '个人额度查询',
                        img: require('../img/gereneduchaxun.png'),
                        url: 'myquota'
                    },
                    {
                        name: '报销账户设置',
                        img: require('../img/baoxiaozhanghushezhi.png'),
                        url: 'bxaccount'
                    },
                    {
                        name: '代报销人设置',
                        img: require('../img/daibaoxiaorenshezhi.png'),
                        url: 'thirdbaoxiao'
                    },
                    {
                        name: '增值税开票信息',
                        img: require('../img/zengzhishui.png'),
                        url: 'vat'
                    },
                    {
                        name: '微账单',
                        img: require('../img/weizhangdan.png'),
                        url: 'mybill'
                    }
                ],
                chaxun: [
                    {
                        name: '通讯费报销单',
                        img: require('../img/tongxunfeibaoxiao.png')
                    },
                    {
                        name: '车辆费报销单',
                        img: require('../img/cheliangfeibaoxiao.png'),
                        type: 'car'
                    },
                    {
                        name: '交通费报销单',
                        img: require('../img/jiaotongfeibaoxiao.png')
                    },
                    {
                        name: '出差申请单',
                        img: require('../img/chuchaishenqing.png')
                    },
                    {
                        name: '差旅报销单',
                        img: require('../img/chailvbaoxiao.png'),
                        type: 'travel'
                    },
                    {
                        name: '事项申请单',
                        img: require('../img/shixiangshenqing.png')
                    },
                    {
                        name: '无合同付款单',
                        img: require('../img/wuhetongfukuan.png')
                    },
                    {
                        name: '合同',
                        img: require('../img/hetong.png'),
                        type: 'contract'
                    }
                ],
                nums: [],
                rank: 0,
                userinfo: {},
                userNum: window.localStorage.getItem('userNum') || 'leixc',
                userName: window.localStorage.getItem('userName') || ''
            };
        },
        computed: {
            creditRank() {
                var rank = this.rank;
                if (rank < 59) {
                    return 1;
                } else if (rank < 75) {
                    return 2;
                } else if (rank < 90) {
                    return 3;
                } else if (rank < 100) {
                    return 4;
                }
            }
        },
        methods: {
            login() {
                var userinfo = window.sessionStorage.getItem('userinfo');
                if (userinfo) {
                    console.log('有个人信息');
                    this.emptyStorage();
                    this.getSessionid();
                    this.getBadges();
                    return;
                }
                var href = window.location.href;
                var code = href.substring(href.indexOf('code=') + 5, href.indexOf('state=') - 1);
                var url2 = this.TOKENHOST + 'msg/getUser?code=' + code;

                this.$http.get(url2).then(res => {
                    console.log(1111);
                    var data = res.data;
                    // 本地保存头像和用户名
                    this.$store.commit('userNum', data.userid);
                    this.$store.commit('avatar', data.avatar);
                    window.localStorage.setItem('userNum', data.userid);

                    this.avatar = data.avatar;
                    this.userNum = res.data.userid;
                    this.emptyStorage();
                    this.getSessionid();
                    // 跳转到进入前页面，取state的参数
                    if (state) {
                        this.$router.push(state);
                    }
                });

                var a = window.location.hash.indexOf('isappinstalled');
                // 去掉微信加的参数
                if (a !== -1) {
                    var hash = window.location.hash.substring(2, a - 1);
                    window.localStorage.setItem('state', hash);
                    console.log('hash:' + hash); // "mycredit?a=1"

                    // 如果没授权过
                    if (!this.userNum) {
                        console.log('没授权');
                        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
                            'appid=wx45362d8e0247a7c7&redirect_uri=http%3A%2F%2Ft1.vanke.com%3A8088%2Fwx%2Findex.html&' +
                            'response_type=code&scope=snsapi_userinfo&agentid=3&state=' + hash + '#wechat_redirect';
                    } else {
                        console.log('跳转');
                        // 去掉链接的from=timeline&isappinstalled=0
                        this.$router.replace('/' + hash);
                    }
                } else {
                    // 从授权重定向进来，带了code和state
//                var href = window.location.href;
//                var code;
                    var state;

                    if (href.indexOf('code=') !== -1) {
                        code = href.substring(href.indexOf('code=') + 5, href.indexOf('state=') - 1);
                        state = href.substring(href.indexOf('state=') + 6, href.length - 2);
                        console.log('code:' + code + ', state:' + state);
                    } else {
                        code = '';
                        state = '';
                    }
                    console.log('url:' + document.URL);
                    // 如果本地没有保存过个人信息, 也正常拿到了code
                    if (!this.USERNUM && code) {
                        // 获取用户信息
//                    var url = 'http://t1.vanke.com:8101/msg/getUser?code=' + code;
//                    this.$http.get(url).then(res => {
//                        alert(res.data);
//                        alert(JSON.stringify(res.data));
//                        console.log(JSON.stringify(res.data));
//                        // 本地保存头像和用户名
//                        this.$store.commit('userNum', res.data.userid);
//                        this.$store.commit('avatar', res.data.avatar);
//                        this.avatar = res.data.avatar;
//                        // 跳转到进入前页面，取state的参数
//                        if (state) {
//                            this.$router.push(state);
//                        }
//                    });
                    } else if (this.USERNUM && state) {
                        console.log('已登陆');
                        // 如果已登陆过，直接跳到进入前页面
                        this.$router.push(state);
                    } else if (!code) {
                        console.log('nocode');
                    }
                }
            },
            // 获取ticket
            getUserTicket(token) {
                console.log('获取ticket');
                console.log(token);

                var href = window.location.href;
                var code = href.substring(href.indexOf('code=') + 5, href.indexOf('state=') - 1);

                var url = this.HELPHOST + 'help_video/proxy_https.do';
                var url2 = this.WEIXINHOST + '/cgi-bin/user/getuserinfo?access_token=' + token + '&code=' + code;
                this.$http.get(url + '?url=' + encodeURIComponent(url2)).then(res => {
                    var ticket = res.data.data['user_ticket'];
                    // 用ticket获取个人信息
                    this.getUserDetail(ticket, token);
                });
            },
            // 获取个人信息
            getUserDetail(ticket, token) {
                console.log('获取个人信息');
                console.log(ticket);
                var url = this.WEIXINHOST + '/cgi-bin/user/getuserdetail';
                var href = window.location.href;
                var state;
                if (href.indexOf('state=') !== -1) {
                    state = href.substring(href.indexOf('state=') + 6, href.length - 2);
                } else {
                    state = '';
                }
                axios.post(url, {
                    'user_ticket': ticket,
                    'access_token': token
                }).then(res => {
                    console.log(JSON.stringify(res.data));
                    // 本地保存头像和用户名
                    window.localStorage.setItem('userNum', res.data.userid);
                    this.userNum = res.data.userid;

                    this.$store.commit('avatar', res.data.avatar);
                    this.avatar = res.data.avatar;
                    // 跳转到进入前页面，取state的参数
                    if (state) {
                        this.$router.push(state);
                    }
                });
            },
            getSessionid() {
                // dcName Eastest（正式环境换成eas750）
                var url = this.HOST + '?method=loginEAS&userName=sysWS&password=sysWS&slnName=eas&dcName=eas750&language=L2&dbType=1';
//                var sessionId = window.sessionStorage.getItem('sessionId');

//                if (sessionId && sessionId !== 'undefined') {
//                    this.$store.commit('sessionId', sessionId);
//                    this.getCredit(sessionId);
//                    this.getUserInfo(sessionId);
//                    return;
//                }
                this.$http.get(url).then(res => {
                    var sessionId = res.data.msg;
                    this.$store.commit('sessionId', sessionId);
                    this.getCredit(sessionId);
                    this.getUserInfo(sessionId);
                });
                setInterval(function() {
                    window.location.reload();
                }, 18000000);
            },
            getCredit(sessionId) {
                var url = this.HOST + '?method=getCredits&userNum=' + this.userNum + '&sessionID=' + sessionId;
                var creditData = window.sessionStorage.getItem('creditData');

                if (creditData && creditData !== 'undefined') {
                    var data = JSON.parse(creditData);
                    this.rank = data.creditScore;
                    return;
                }
                this.$http.get(url).then(res => {
                    this.creditRank = res.data.scoreName;
                    window.sessionStorage.setItem('creditData', JSON.stringify(res.data));
                    this.rank = res.data.creditScore;
                });
            },
            getUserInfo(sessionId) {
                var url = this.HOST + '?method=getAccountBank&userNum=' + this.userNum + '&sessionID=' + sessionId;
                var userinfo = window.sessionStorage.getItem('userinfo');

                if (userinfo && userinfo !== 'undefined') {
                    var data = JSON.parse(userinfo);
                    this.userinfo = data;
                    console.log(this.userinfo);
                    return;
                }
                this.$http.get(url).then(res => {
                    if (res.data) {
                        this.userinfo = res.data;
                        window.sessionStorage.setItem('userinfo', JSON.stringify(res.data));
                    }
                });
            },
            goToDetail(name, src) {
                window.localStorage.setItem('billname', name);
                window.localStorage.setItem('billicon', src);

                this.$router.push('./singleList');
            },
            getBadges() {
                /* eslint-disable no-unused-vars */
                var self = this;
                var url1 = this.HOST + '?method=getBizAccountBills&userNum=' + this.userNum + '&sessionID=' + this.SESSIONID;
                var url2 = this.HOST + '?method=getComputerAccounts&userNum=' + this.userNum + '&sessionID=' + this.SESSIONID;
                var url3 = this.HOST + '?method=listTravelBillWK&unumber=' + this.userNum + '&sessionID=' + this.SESSIONID;
                var url4 = this.HOST + '?method=getContractPayments&userNum=' + this.userNum + '&sessionID=' + this.SESSIONID;
                var url5 = this.HOST + '?method=getNoContractPayments&userNum=' + this.userNum + '&sessionID=' + this.SESSIONID;
                var numsStored = window.sessionStorage.getItem('badges');

                if (numsStored) {
                    this.nums = JSON.parse(numsStored);
                    // 如果和列表获取数据一样就不往下执行
                    if (window.sessionStorage.getItem('baoxiaoData-detail') ===
                        window.sessionStorage.getItem('baoxiaoData')) {
                        console.log('same');
                        return;
                    }
                } else {
                    Indicator.open({
                        text: '加载中...',
                        spinnerType: 'snake'
                    });
                }
                // 要加个有值就不请求
                axios.all([
                    axios.get(url1),
                    axios.get(url2),
                    axios.get(url3),
                    axios.get(url4),
                    axios.get(url5)
                ]).then(axios.spread(function (data1, data2, data3, data4, data5) {
                    // 上面两个请求都完成后，才执行这个回调方法

                    var arr1 = data1.data.t;
                    var arr2 = data2.data.t;
                    var arr3 = data3.data.t;
                    var arr4 = data4.data.t;
                    var arr5 = data5.data.t;

                    var num1 = 0;
                    var num2 = 0;
                    var num3 = 0;
                    var num4 = 0;
                    var num5 = 0;

                    if (!arr1) {
                        arr1 = [];
                    }
                    if (!arr2) {
                        arr2 = [];
                    }
                    if (!arr3) {
                        arr3 = [];
                    }
                    if (!arr4) {
                        arr3 = [];
                    }
                    if (!arr5) {
                        arr3 = [];
                    }

                    var arr = arr1.concat(arr2, arr3, arr4, arr5);
                    window.sessionStorage.setItem('baoxiaoData', JSON.stringify(arr));

                    for (var i = 0; i < arr.length; i++) {
                        var state1 = ['20', '25'];// 未发
                        var state2 = ['30', '145', '305']; // 审批中
                        var state3 = ['60', '65', '300', '210', '205']; // 待付款
//                        var state4 = ['70', '45', '80']; // 已付款
                        var state5 = ['45', '60', '65', '70', '80']; // 待评价

                        if (state1.indexOf(arr[i].state) !== -1 || state1.indexOf(arr[i].FSTATE) !== -1) {
                            num1++;
                        }
                        if (state2.indexOf(arr[i].state) !== -1 || state2.indexOf(arr[i].FSTATE) !== -1) {
                            num2++;
                        }
                        if (state3.indexOf(arr[i].state) !== -1 || state3.indexOf(arr[i].FSTATE) !== -1) {
                            num3++;
                        }
                        if (state5.indexOf(arr[i].state) !== -1 || state5.indexOf(arr[i].FSTATE) !== -1) {
                            num5++;
                        }
                    }

                    var nums = [];
                    self.nums = nums;
                    self.nums.push(num1, num2, num3, num4, num5);
                    if (JSON.stringify(self.nums) !== numsStored) {
                        window.sessionStorage.setItem('badges', JSON.stringify(self.nums));
                    }
                    Indicator.close();
                }));
            },
            emptyStorage() {
                window.sessionStorage.removeItem('bankName');
                window.sessionStorage.removeItem('badges');
            }
        },
        mounted() {
        },
        created() {
            this.login();
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";

    .home {
        padding-bottom: .2rem;
        .userinfo {
            overflow-x: hidden;
            position: relative;
            width: 100%;
            height: 2.1rem;
            padding: .4rem .28rem;
            background-color: @theme-color;
            color: #fff;
            margin-bottom: .2rem;
            .text {
                margin-left: .3rem;
                margin-top: .25rem;
                div {
                    line-height: 1;
                }
                .username {
                    font-size: @card-title-fsize;
                    margin-bottom: .2rem;
                }
                .account {
                    font-size: @sub-title-fsize;
                }
            }
            .credit {
                position: absolute;
                top: .75rem;
                right: -.26rem;
                padding-left: .24rem;
                padding-right: .1rem;
                height: .6rem;
                line-height: .62rem;

                font-size: .22rem;
                color: #fff;
                background-image: linear-gradient(90deg, rgba(29, 148, 197, 0.6), rgba(56, 92, 173, 0.6));
                border-radius: .3rem;

                .rank {
                    display: inline-block;
                    width: .2rem;
                    height: .2rem;
                    background-size: cover;
                }
                img {
                    height: .2rem;
                    margin-top: -0.04rem;
                    margin-right: .28rem;
                }
            }
        }
        .card {
            /*border-bottom: 1px solid #e0e0e0;*/
            margin-bottom: .2rem;
            .top {
                font-size: .3rem;
                color: @text-color1;
                border-bottom: 1px solid #e0e0e0;
            }

            &.baoxiao {
                .card-main {
                    .item {
                        width: 20%;
                        .img {
                            height: .62rem;
                        }
                        .icon {
                            width: .4rem;
                        }
                        border-bottom: none;
                    }
                }
            }
            &.my-invoice {
                text-align: center;
                .top {
                    img {
                        width: .36rem;
                        height: .36rem;
                        margin-top: -.06rem;
                        margin-right: .06rem;
                    }
                }
                .card-main {
                    height: 1.96rem;
                    line-height: 1.96rem;
                    img {
                        width: 1.34rem;
                    }
                }
            }
        }
    }
</style>
