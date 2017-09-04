<template>
    <div class="bill baoxiao">
        <slide-tab @onTab="onTab" :top="0">
            <div class="tabItem">
                <ul class='tabClick box'>
                    <li class="active">
                        全部
                    </li>
                    <li>未发k2</li>
                    <li>审批中</li>
                    <li>待付款</li>
                    <li>已付款</li>
                    <li>待评价</li>
                </ul>
                <div class='lineBorder'>
                    <div class='lineDiv' :style="{width: 100 / 6 + '%'}"><!--滑动条--></div>
                </div>
            </div>
            <div class='tabCon'>
                <div class='tabBox'>
                    <!--全部-->
                    <div class="tabList">
                        <!--:style="{backgroundImage: 'url('+ stampPass +')'}"-->
                        <div class="card box stamp data1" v-for="(item, index) in list"
                             @click="goToDetail(item.name, item.num || item.FNUMBER, item.cause ||
                             item.FCAUSE, item.state || item.FSTATE, item.amount || item.FAMOUNT, item.FBILLDATE,  getBillIcons(item.name || '差旅报销单', item.expenseType), item.expenseType)">
                            <div class="left">
                                <img :src="getBillIcons(item.name || '差旅报销单', item.expenseType)" class="icon">
                            </div>
                            <div class="main box-f1">
                                <div class="upper clear">
                                    <div class="title fl">{{item.cause || item.FCAUSE}}</div>
                                    <div class="date fr">{{item.billDate || item.FBILLDATE.substring(0, 10)}}</div>
                                </div>
                                <div class="mid">
                                    <div class="type">单据类型：{{item.name || '差旅报销单'}}</div>
                                </div>
                                <div class="lower clear">
                                    <div class="subtitle fl">金额：¥{{item.amount || item.FAMOUNT}}</div>
                                    <div class="status default fr"
                                         :class="{fail: (item.state == '27' || item.state == '80') ||
                                          (item.FSTATE == '27' || item.FSTATE == '80')}">
                                        {{BILLSTATE[item.state] || BILLSTATE[item.FSTATE]}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <empty :flag="empty1"></empty>
                    </div>
                    <div class="tabList">
                        <div class="card box stamp data2" v-for="(item, index) in list"
                             @click="goToDetail(item.name, item.num || item.FNUMBER, item.cause ||
                             item.FCAUSE, item.state || item.FSTATE, item.amount || item.FAMOUNT, item.FBILLDATE,  getBillIcons(item.name || '差旅报销单', item.expenseType), item.expenseType)"
                             v-if="states('未发', item.state || item.FSTATE)">
                            <div class="left">
                                <img :src="getBillIcons(item.name || '差旅报销单', item.expenseType)" class="icon">
                            </div>
                            <div class="main box-f1">
                                <div class="upper clear">
                                    <div class="title fl">{{item.cause || item.FCAUSE}}</div>
                                    <div class="date fr">{{item.billDate || item.FBILLDATE.substring(0, 10)}}</div>
                                </div>
                                <div class="mid">
                                    <div class="type">单据类型：{{item.name || '差旅报销单'}}</div>
                                </div>
                                <div class="lower clear">
                                    <div class="subtitle fl">金额：¥{{item.amount || item.FAMOUNT}}</div>
                                    <div class="status default fr"
                                         :class="{fail: (item.state == '27' || item.state == '80') ||
                                          (item.FSTATE == '27' || item.FSTATE == '80')}">
                                        {{BILLSTATE[item.state] || BILLSTATE[item.FSTATE]}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <empty :flag="empty2"></empty>
                    </div>
                    <div class="tabList">
                        <div class="card box stamp data3" v-for="(item, index) in list"
                             @click="goToDetail(item.name, item.num || item.FNUMBER, item.cause ||
                             item.FCAUSE, item.state || item.FSTATE, item.amount || item.FAMOUNT, item.FBILLDATE,  getBillIcons(item.name || '差旅报销单', item.expenseType), item.expenseType)"
                             v-if="states('审批中', item.state || item.FSTATE)">
                            <div class="left">
                                <img :src="getBillIcons(item.name || '差旅报销单', item.expenseType)" class="icon">
                            </div>
                            <div class="main box-f1">
                                <div class="upper clear">
                                    <div class="title fl">{{item.cause || item.FCAUSE}}</div>
                                    <div class="date fr">{{item.billDate || item.FBILLDATE.substring(0, 10)}}</div>
                                </div>
                                <div class="mid">
                                    <div class="type">单据类型：{{item.name || '差旅报销单'}}</div>
                                </div>
                                <div class="lower clear">
                                    <div class="subtitle fl">金额：¥{{item.amount || item.FAMOUNT}}</div>
                                    <div class="status default fr"
                                         :class="{fail: (item.state == '27' || item.state == '80') ||
                                          (item.FSTATE == '27' || item.FSTATE == '80')}">
                                        {{BILLSTATE[item.state] || BILLSTATE[item.FSTATE]}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <empty :flag="empty3"></empty>
                    </div>
                    <div class="tabList">
                        <div class="card box stamp data4" v-for="(item, index) in list"
                             @click="goToDetail(item.name, item.num || item.FNUMBER, item.cause ||
                             item.FCAUSE, item.state || item.FSTATE, item.amount || item.FAMOUNT, item.FBILLDATE,  getBillIcons(item.name || '差旅报销单', item.expenseType), item.expenseType)"
                             v-if="states('待付款', item.state || item.FSTATE)">
                            <div class="left">
                                <img :src="getBillIcons(item.name || '差旅报销单', item.expenseType)" class="icon">
                            </div>
                            <div class="main box-f1">
                                <div class="upper clear">
                                    <div class="title fl">{{item.cause || item.FCAUSE}}</div>
                                    <div class="date fr">{{item.billDate || item.FBILLDATE.substring(0, 10)}}</div>
                                </div>
                                <div class="mid">
                                    <div class="type">单据类型：{{item.name || '差旅报销单'}}</div>
                                </div>
                                <div class="lower clear">
                                    <div class="subtitle fl">金额：¥{{item.amount || item.FAMOUNT}}</div>
                                    <div class="status default fr"
                                         :class="{fail: (item.state == '27' || item.state == '80') ||
                                          (item.FSTATE == '27' || item.FSTATE == '80')}">
                                        {{BILLSTATE[item.state] || BILLSTATE[item.FSTATE]}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <empty :flag="empty4"></empty>
                    </div>
                    <div class="tabList">
                        <div class="card box stamp data5" v-for="(item, index) in list"
                             @click="goToDetail(item.name, item.num || item.FNUMBER, item.cause ||
                             item.FCAUSE, item.state || item.FSTATE, item.amount || item.FAMOUNT, item.FBILLDATE,  getBillIcons(item.name || '差旅报销单', item.expenseType), item.expenseType)"
                             v-if="states('已付款', item.state || item.FSTATE)">
                            <div class="left">
                                <img :src="getBillIcons(item.name || '差旅报销单', item.expenseType)" class="icon">
                            </div>
                            <div class="main box-f1">
                                <div class="upper clear">
                                    <div class="title fl">{{item.cause || item.FCAUSE}}</div>
                                    <div class="date fr">{{item.billDate || item.FBILLDATE.substring(0, 10)}}</div>
                                </div>
                                <div class="mid">
                                    <div class="type">单据类型：{{item.name || '差旅报销单'}}</div>
                                </div>
                                <div class="lower clear">
                                    <div class="subtitle fl">金额：¥{{item.amount || item.FAMOUNT}}</div>
                                    <div class="status default fr"
                                         :class="{fail: (item.state == '27' || item.state == '80') ||
                                          (item.FSTATE == '27' || item.FSTATE == '80')}">
                                        {{BILLSTATE[item.state] || BILLSTATE[item.FSTATE]}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <empty :flag="empty5"></empty>
                    </div>
                    <div class="tabList">
                        <div class="card box stamp data6" :a="item.isEvaluat" v-for="(item, index) in list"
                             @click="goToDetail(item.name, item.num || item.FNUMBER, item.cause ||
                             item.FCAUSE, item.state || item.FSTATE, item.amount || item.FAMOUNT, item.FBILLDATE,  getBillIcons(item.name || '差旅报销单', item.expenseType), item.expenseType)"
                             v-if="(item.isEvaluat === '0' || item.ISEVALUAT === '0') &&
                             states('待评价', item.state || item.FSTATE)">
                            <div class="left">
                                <img :src="getBillIcons(item.name || '差旅报销单', item.expenseType)" class="icon">
                            </div>
                            <div class="main box-f1">
                                <div class="upper clear">
                                    <div class="title fl">{{item.cause || item.FCAUSE}}</div>
                                    <div class="date fr">{{item.billDate || item.FBILLDATE.substring(0, 10)}}</div>
                                </div>
                                <div class="mid">
                                    <div class="type">单据类型：{{item.name || '差旅报销单'}}</div>
                                </div>
                                <div class="lower clear">
                                    <div class="subtitle fl">金额：¥{{item.amount || item.FAMOUNT}}</div>
                                    <a @click.stop="gotoComment(item.num || item.FNUMBER,
                                     item.JM || 'CB201')"
                                       class="status comment fr">立即评价</a>
                                </div>
                            </div>
                        </div>
                        <empty :flag="empty6"></empty>
                    </div>
                </div>
            </div>
        </slide-tab>
    </div>
</template>

<script>
    import slideTab from '../components/slideTab.vue';
    import axios from 'axios';
    import { Indicator } from 'mint-ui'; // Toast
    import { quickSort } from '../utils/sortArr';
    import empty from '../components/empty.vue';

    export default {
        components: {
            slideTab,
            empty
        },
        data() {
            return {
                stampPass: require('../img/stamp-complete.png'),
                stampFail: require('../img/stamp-abandon.png'),
                list: [],
                empty1: false,
                empty2: false,
                empty3: false,
                empty4: false,
                empty5: false,
                empty6: false
            };
        },
        methods: {
            isHide() {
                var data1 = document.querySelectorAll('.data1');
                var data2 = document.querySelectorAll('.data2');
                var data3 = document.querySelectorAll('.data3');
                var data4 = document.querySelectorAll('.data4');
                var data5 = document.querySelectorAll('.data5');
                var data6 = document.querySelectorAll('.data6');

                if (!data1 || data1.length === 0) {
                    this.empty1 = true;
                } else {
                    this.empty1 = false;
                }
                if (!data2 || data2.length === 0) {
                    this.empty2 = true;
                } else {
                    this.empty2 = false;
                }
                if (!data3 || data3.length === 0) {
                    this.empty3 = true;
                } else {
                    this.empty3 = false;
                }
                if (!data4 || data4.length === 0) {
                    this.empty4 = true;
                } else {
                    this.empty4 = false;
                }
                if (!data5 || data5.length === 0) {
                    this.empty5 = true;
                } else {
                    this.empty5 = false;
                }
                if (!data6 || data6.length === 0) {
                    this.empty6 = true;
                } else {
                    this.empty6 = false;
                }
            },
            getexpanseName(name, expenseType) {
                switch (expenseType) {
                case 'car': name = '车辆费报销单';
                    break;
                case 'bus': name = '交通费报销单';
                    break;
                case 'tel': name = '通讯费报销单';
                    break;
                case 'other': name = '其他费用报销单';
                    break;
                }
                return name;
            },
            getBillIcons(name, expenseType) {
                if (expenseType) {
                    name = this.getexpanseName(name, expenseType);
                }
                return this.BILLICONS[name];
            },
            getBaoxiao() {
                var self = this;
                var url1 = this.HOST + '?method=getBizAccountBills&userNum=' + this.USERNUM + '&sessionID=' + this.SESSIONID;
                var url2 = this.HOST + '?method=getComputerAccounts&userNum=' + this.USERNUM + '&sessionID=' + this.SESSIONID;
                var url3 = this.HOST + '?method=listTravelBillWK&unumber=' + this.USERNUM + '&sessionID=' + this.SESSIONID;
                var url4 = this.HOST + '?method=getContractPayments&userNum=' + this.USERNUM + '&sessionID=' + this.SESSIONID;
                var url5 = this.HOST + '?method=getNoContractPayments&userNum=' + this.USERNUM + '&sessionID=' + this.SESSIONID;

                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });

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
                    window.sessionStorage.setItem('baoxiaoData-detail', JSON.stringify(arr));
                    console.log(arr);
                    self.list = arr;
                    self.list = quickSort(self.list, 'billDate', 'FBILLDATE', false);

                    Indicator.close();
                }));
            },
            goToDetail(name, num, cause, state, money, isChailv, icon, expenseType) {
                var billname = name;
                if (isChailv) {
                    billname = '差旅报销单';
                }
                if (expenseType) {
                    billname = this.getexpanseName(name, expenseType);
                }
                window.localStorage.setItem('billname', billname);
                window.localStorage.setItem('cause', cause);
                window.localStorage.setItem('state', state);
                window.localStorage.setItem('money', money);
                window.localStorage.setItem('billicon', icon);

                if (name === '出差申请单') {
                    this.$router.push('/travelbilldetail?billNum=' + num);
                } else {
                    this.$router.push('/billdetail?billNum=' + num);
                }
            },
            gotoComment(num, type) {
//                console.log(num);
//                console.log(type);
                this.$router.push('/comment?billNum=' + num + '&type=' + type);
            },
            states(text, state) {
                var arr = [];

                if (text === '未发') {
                    arr = ['20', '25'];// '暂存', '已提交未发k2'
                } else if (text === '审批中') {
                    arr = ['30', '145', '305']; // '业务审批中', '审核中', '共享打回'
                } else if (text === '待付款') {
                    arr = ['60', '65', '300', '210', '205']; // '审核通过', '等待付款', '未付款', '已退票', '已打回'
                } else if (text === '已付款') {
                    arr = ['70', '45', '80']; // '已付款', '已生成凭证', '已关闭'
                } else if (text === '待评价') {
                    arr = ['45', '60', '65', '70', '80']; // '审核通过', '等待付款', '已付款', '已生成凭证', '已关闭'
                }

                if (arr.indexOf(state) !== -1) {
                    return true;
                } else {
                    return false;
                }
//                if (arr.indexOf(this.BILLSTATE[state]) !== -1) {
//                    return true;
//                } else {
//                    return false;
//                }
            },
            onTab(index) {
                if (this.list.length === 0) {
                    Indicator.close();
                    Indicator.open({
                        text: '加载中...',
                        spinnerType: 'snake'
                    });
                }
                this.$router.replace('/mybaoxiao?index=' + index);
            },
            emptyLoc() {
//                window.localStorage.removeItem('billname');
                window.localStorage.removeItem('cause');
                window.localStorage.removeItem('state');
                window.localStorage.removeItem('money');
            }
        },
        created() {
//            var list = [
//                {
//                    'state': '45',
//                    'billDate': '2016-12-13',
//                    'name': '费用报销单',
//                    'cause': '职工交通费',
//                    'num': '027DC01FB201612130009',
//                    'amount': '600',
//                    'JM': 'NP',
//                    'isEvaluat': '0'
//                }
//            ];
//            this.list = quickSort(list, 'billDate', 'FBILLDATE', false);
//            console.log(this.list);
            this.getBaoxiao();
            this.emptyLoc();
        }
    };
</script>

<style lang="less" scoped src="../css/bill.less"></style>
