<template>
    <div class="bill">
        <slide-tab :top="0">
            <div class="tabItem">
                <ul class='tabClick box'>
                    <li class="active">
                        全部
                    </li>
                    <li>未完成</li>
                    <li>已完成</li>
                </ul>
                <div class='lineBorder'>
                    <div class='lineDiv' :style="{width: 100/3 + '%'}"><!--滑动条--></div>
                </div>
            </div>
            <div class='tabCon'>
                <div class='tabBox'>
                    <div class='tabList'>
                        <div :a="index" :type="item.expenseType" v-for="(item, index) in data" v-if="(name !== '车辆费报销单' ||
                         item.expenseType === 'car') && (name !== '其他费用报销单' ||
                         item.expenseType === 'other') && (name !== '交通费报销单' ||
                         item.expenseType === 'bus') && (name !== '通讯费报销单' ||
                         item.expenseType === 'tel')" class="card box"
                             @click="goToDetail(item.name, item.num || item.number || item.FNUMBER, item.cause ||
                             item.FCAUSE, item.state || item.FSTATE, item.amount || item.FAMOUNT, item.conFormat)">
                            <div class="left">
                                <img :src="icon" class="icon">
                            </div>
                            <div class="main box-f1">
                                <div class="upper clear">
                                    <div class="title ell-2 fl" v-if="name ==='差旅报销单'">{{item.FCAUSE}}</div>
                                    <div class="title ell-2 fl" v-else>{{item.cause}}</div>
                                    <div class="date fr" v-if="name ==='出差申请单'">{{item.createtime.substring(0, 10)}}
                                    </div>
                                    <div class="date fr" v-if="name ==='差旅报销单'">{{item.FBILLDATE.substring(0, 10)}}
                                    </div>
                                    <div class="date fr" v-else>{{item.billDate}}</div>
                                </div>
                                <div class="lower clear">
                                    <div class="subtitle fl" v-if="name ==='出差申请单'">目的地：{{item.to}}</div>
                                    <div class="subtitle fl" v-if="name ==='差旅报销单'">金额：¥{{item.FAMOUNT}}</div>
                                    <div class="subtitle fl" v-if="name !=='出差申请单' && name !=='差旅报销单'">金额：¥{{item.amount}}</div>
                                    <div class="status default fr"
                                         :class="{fail: item.state == '27' || item.state == '80' ||
                                    item.FSTATE == '27' || item.FSTATE == '80'}"
                                         v-if="name ==='差旅报销单'">
                                        {{BILLSTATE[item.FSTATE]}}
                                    </div>
                                    <div class="status default fr"
                                         :class="{fail: item.state == '27' || item.state == '80' ||
                                    item.FSTATE == '27' || item.FSTATE == '80'}"
                                         v-else>
                                        {{BILLSTATE[item.state]}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <empty :flag="dataEmpty"></empty>
                    </div>
                    <div class='tabList'>
                        <div v-for="(item, index) in data" class="card box uncomplete"
                             @click="goToDetail(item.name, item.num || item.number || item.FNUMBER, item.cause ||
                             item.FCAUSE, item.state || item.FSTATE, item.amount || item.FAMOUNT, item.conFormat)"
                             v-if="!getComplete(name, item.state || item.FSTATE) &&
                            (name !== '车辆费报销单' ||
                         item.expenseType === 'car') && (name !== '其他费用报销单' ||
                         item.expenseType === 'other') && (name !== '交通费报销单' ||
                         item.expenseType === 'bus') && (name !== '通讯费报销单' ||
                         item.expenseType === 'tel')">
                            <div class="left">
                                <img :src="icon" class="icon">
                            </div>
                            <div class="main box-f1">
                                <div class="upper clear">
                                    <div class="title ell-2 fl" v-if="name ==='差旅报销单'">{{item.FCAUSE}}</div>
                                    <div class="title ell-2 fl" v-else>{{item.cause}}</div>
                                    <div class="date fr" v-if="name ==='出差申请单'">{{item.createtime.substring(0, 10)}}
                                    </div>
                                    <div class="date fr" v-if="name ==='差旅报销单'">{{item.FBILLDATE.substring(0, 10)}}
                                    </div>
                                    <div class="date fr" v-else>{{item.billDate}}</div>
                                </div>
                                <div class="lower clear">
                                    <div class="subtitle fl" v-if="name ==='出差申请单'">目的地：{{item.to}}</div>
                                    <div class="subtitle fl" v-if="name ==='差旅报销单'">金额：¥{{item.FAMOUNT}}</div>
                                    <div class="subtitle fl" v-else>金额：¥{{item.amount}}</div>
                                    <div class="status default fr"
                                         :class="{fail: item.state == '27' || item.state == '80' ||
                                    item.FSTATE == '27' || item.FSTATE == '80'}"
                                         v-if="name ==='差旅报销单'">
                                        {{BILLSTATE[item.FSTATE]}}
                                    </div>
                                    <div class="status default fr"
                                         :class="{fail: item.state == '27' || item.state == '80' ||
                                    item.FSTATE == '27' || item.FSTATE == '80'}"
                                         v-else>
                                        {{BILLSTATE[item.state]}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <empty :flag="uncompleteEmpty"></empty>
                    </div>
                    <div class='tabList'>
                        <div v-for="(item, index) in data" class="card box complete"
                             @click="goToDetail(item.name, item.num || item.number || item.FNUMBER, item.cause ||
                             item.FCAUSE, item.state || item.FSTATE, item.amount || item.FAMOUNT, item.conFormat)"
                             v-if="getComplete(name, item.state || item.FSTATE) &&
                            (name !== '车辆费报销单' ||
                         item.expenseType === 'car') && (name !== '其他费用报销单' ||
                         item.expenseType === 'other') && (name !== '交通费报销单' ||
                         item.expenseType === 'bus') && (name !== '通讯费报销单' ||
                         item.expenseType === 'tel')">
                            <div class="left">
                                <img :src="icon" class="icon">
                            </div>
                            <div class="main box-f1">
                                <div class="upper clear">
                                    <div class="title ell-2 fl" v-if="name ==='差旅报销单'">{{item.FCAUSE}}</div>
                                    <div class="title ell-2 fl" v-else>{{item.cause}}</div>
                                    <div class="date fr" v-if="name ==='出差申请单'">{{item.createtime.substring(0, 10)}}
                                    </div>
                                    <div class="date fr" v-if="name ==='差旅报销单'">{{item.FBILLDATE.substring(0, 10)}}
                                    </div>
                                    <div class="date fr" v-else>{{item.billDate}}</div>
                                </div>
                                <div class="lower clear">
                                    <div class="subtitle fl" v-if="name ==='出差申请单'">目的地：{{item.to}}</div>
                                    <div class="subtitle fl" v-if="name ==='差旅报销单'">金额：¥{{item.FAMOUNT}}</div>
                                    <div class="subtitle fl" v-else>金额：¥{{item.amount}}</div>
                                    <div class="status default fr"
                                         :class="{fail: item.state == '27' || item.state == '80' ||
                                    item.FSTATE == '27' || item.FSTATE == '80'}"
                                         v-if="name ==='差旅报销单'">
                                        {{BILLSTATE[item.FSTATE]}}
                                    </div>
                                    <div class="status default fr"
                                         :class="{fail: item.state == '27' || item.state == '80' ||
                                    item.FSTATE == '27' || item.FSTATE == '80'}"
                                         v-else>
                                        {{BILLSTATE[item.state]}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <empty :flag="completeEmpty"></empty>
                    </div>
                </div>
            </div>
        </slide-tab>
    </div>
</template>

<script>
    import slideTab from '../components/slideTab.vue';
    import empty from '../components/empty.vue';
    import { quickSort } from '../utils/sortArr';

    export default {
        components: {
            slideTab,
            empty
        },
        data() {
            return {
                name: window.localStorage.getItem('billname'),
                icon: window.localStorage.getItem('billicon'),
                type: window.localStorage.getItem('billtype'),
                data: '',
                dataEmpty: false,
                uncompleteEmpty: true,
                completeEmpty: true
            };
        },
        methods: {
            goToDetail(name, num, cause, state, money, conFormat) {
                switch (conFormat) {
                case 'strcon':
                    window.localStorage.setItem('conbillname', '战略合同');
                    break;
                case 'consplit':
                    window.localStorage.setItem('conbillname', '合同调整');
                    break;
                case 'addcon':
                    window.localStorage.setItem('conbillname', '补充合同');
                    break;
//                case 'maincon':
//                    window.localStorage.setItem('conbillname', '合同');
//                    break;
                }
                if (!cause) {
                    cause = '';
                }
                if (!state) {
                    state = '';
                }
                if (!money) {
                    money = '';
                }
                window.localStorage.setItem('cause', cause);
                window.localStorage.setItem('state', state);
                window.localStorage.setItem('money', money);
                console.log(cause, state, money);

                if (this.name === '出差申请单') {
                    this.$router.push('/travelbilldetail?billNum=' + num);
                } else {
                    this.$router.push('/billdetail?billNum=' + num);
                }
            },
            getComplete(name, state) {
                /* eslint-disable no-unused-vars */
                var arr = [];
                if (name === '借款单') {
                    arr = ['70', '45', '27'];
                } else if (name === '通讯费报销单' || name === '车辆费报销单' ||
                    name === '交通费报销单' || name === '其他费用报销单') {
                    arr = ['70', '45', '27', '80'];
                } else if (name === '差旅报销单') {
                    arr = ['70', '45', '27', '80'];
                } else if (name === '电脑报销单') {
                    arr = ['70', '45', '27'];
                } else if (name === '合同付款单') {
                    arr = ['70', '45', '27'];
                } else if (name === '无合同付款单') {
                    arr = ['70', '45', '27'];
                } else if (name === '费用申请单' || name === '出差申请单' ||
                    name === '电脑申请单' || name === '事项申请单') {
                    arr = ['60', '27'];
                } else if (name === '还款单') {
                    arr = ['135', '155'];
                } else if (name === '合同') {
                    arr = ['27', '175', '28'];
                } else if (name === '合同结算') {
                    arr = ['60', '27'];
                }

                if (arr.indexOf(state) !== -1) {
                    return true;
                } else {
                    return false;
                }
            },
            isHide() {
                var uncomplete = document.querySelectorAll('.uncomplete');
                var complete = document.querySelectorAll('.complete');
                if (!uncomplete || uncomplete.length === 0) {
                    this.uncompleteEmpty = true;
                } else {
                    this.uncompleteEmpty = false;
                }
                if (!complete || complete.length === 0) {
                    this.completeEmpty = true;
                } else {
                    this.completeEmpty = false;
                }
            },
            emptyLoc() {
                window.localStorage.removeItem('cause');
                window.localStorage.removeItem('state');
                window.localStorage.removeItem('money');
                window.localStorage.removeItem('conbillname');
            }
        },
        created() {
            var method = this.LISTARR[this.name];
            if (method) {
                var url = '';
                if (this.name !== '差旅报销单') {
                    url = this.HOST + '?method=' + method + '&userNum=' + this.USERNUM + '&sessionID=' + this.SESSIONID;
                } else {
                    url = this.HOST + '?method=listTravelBillWK&unumber=' + this.USERNUM + '&sessionID=' + this.SESSIONID;
                }
                console.log(url);
                this.$http.post(url).then(res => {
                    this.data = res.data.t;
                    if (this.name === '差旅报销单' || this.name === '出差申请单') {
                        this.data = quickSort(this.data, 'FBILLDATE', 'createtime', false);
                    } else {
                        this.data = quickSort(this.data, 'billDate', false);
                    }
//                    if (!this.data) {
//                        this.dataEmpty = true;
//                        return;
//                    }
                    if (!this.data || this.data.length === 0) {
                        this.dataEmpty = true;
                    }
                });
            } else {
                this.dataEmpty = true;
            }

            this.emptyLoc();
        },
        updated() {
            this.isHide();
        }
    };
</script>

<style lang="less" scoped src="../css/bill.less"></style>
