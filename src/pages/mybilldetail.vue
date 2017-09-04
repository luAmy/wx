<template>
    <div class="bill mybilldetail">
        <div class="sec clear">
            <div class="text fl">本月</div>
            <router-link class="view-month fr" :to="'/monthbill?year=' + year + '&month=' + month">
                查看月账单 <img :src="arrow" alt="arrow" class="arrow">
            </router-link>
        </div>
        <div class="card box" @click="goToDetail(item.name || '差旅报销单', item.num || item.number || item.FNUMBER,
         item.cause || item.FCAUSE, item.state || item.FSTATE, item.amount || item.FAMOUNT,
         item.conFormat, getBillIcons(item.name || '差旅报销单', item.expenseType), item.expenseType)"
             v-for="(item, index) in data">
            <div class="left">
                <img :src="getBillIcons(item.name || '差旅报销单', item.expenseType)" class="icon">
            </div>
            <div class="main box-f1">
                <div class="upper clear">
                    <div class="title fl ell-2">{{item.name}}
                        <div class="status default fr">{{BILLSTATE[item.state]}}</div>
                    </div>
                    <div class="date fr">{{item.billDate}}</div>
                </div>
                <div class="lower clear">
                    <div class="subtitle fl ellipsis cause">{{item.cause}}</div>
                    <div class="subtitle money fr">¥{{item.amount}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { quickSort } from '../utils/sortArr';

    export default {
        data() {
            return {
                arrow: require('../img/arrow-right.png'),
                data: []
            };
        },
        methods: {
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
                if (name === '费用报销单') {
                    name = '其他费用报销单';
                }
                return this.BILLICONS[name];
            },
            goToDetail(name, num, cause, state, money, conFormat, icon, expenseType) {
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
                if (expenseType) {
                    name = this.getexpanseName(name, expenseType);
                }
                if (name === '费用报销单') {
                    name = '其他费用报销单';
                }
                window.localStorage.setItem('billname', name);
                window.localStorage.setItem('cause', cause);
                window.localStorage.setItem('state', state);
                window.localStorage.setItem('money', money);
                window.localStorage.setItem('billicon', icon);
                console.log(cause, state, money);

                if (this.name === '出差申请单') {
                    this.$router.push('/travelbilldetail?billNum=' + num);
                } else {
                    this.$router.push('/billdetail?billNum=' + num);
                }
            }
        },
        computed: {
            year() {
                var query = this.$route.query;
                return query.year;
            },
            month() {
                var query = this.$route.query;
                var month = query.month;
                if (month.length < 2) {
                    return '0' + month;
                } else {
                    return month;
                }
            }
        },
        created() {
            var url = this.HOST + '?method=getVBills&userNum=' + this.USERNUM + '&year=' + this.year +
                '&month=' + this.month + '&sessionID=' + this.SESSIONID;
            this.$http.post(url).then(res => {
                this.data = res.data.t;
                this.data = quickSort(this.data, 'billDate', '', false);
            });
        }
    };
</script>

<style lang="less" scoped src="../css/bill.less"></style>
<style lang="less" scoped>
    @import "../css/var.less";

    .mybilldetail {
        .sec {
            padding: 0 .28rem;
            line-height: .76rem;
            font-size: @cell-title-fsize;
            .text {
                color: @text-color1;
            }
            .view-month {
                font-size: @sub-title-fsize;
                color: @text-color3;
            }
            .arrow {
                width: .14rem;
                margin-top: -.02rem;
                margin-left: .06rem;
            }
        }
        .card {
            margin: 0;
            border-bottom: 1px solid #e0e0e0;
            .money {
                color: @text-color1;
            }
            &:last-child {
                border-bottom: none;
            }
            .status {
                margin-left: .1rem;
            }
        }
        .cause {
            width: 5rem;
        }
    }
</style>
