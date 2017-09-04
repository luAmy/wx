<template>
    <div class="monthbill quota">
        <div class="list">
            账单日期：
            <span class="date" v-if="month !== '01'">{{year}}年{{month-1}}月25日～{{year}}年{{month}}月25日</span>
            <span class="date" v-else>{{year-1}}年12月25日～{{year}}年{{month}}月25日</span>
        </div>
        <div class="sec">个人额度使用情况</div>
        <div class="card bar-card" v-for="(item, index) in credit" :key="index">
            <div class="title">{{item.expenseName | quotaText}}</div>
            <div class="bar">
                <div class="bar-bg"></div>
                <div class="bar-front"></div>
            </div>
            <div class="addition clear">
                <div class="text fl">
                    剩<span class="num">{{item.decAvailable}}</span>元，可用共{{item.totoal}}元
                </div>
                <!--<router-link class="detail fr" :to="'/quotadetail'">-->
                    <!--查看明细 <img :src="arrow" alt="arrow">-->
                <!--</router-link>-->
            </div>
        </div>
        <div class="sec">借还款情况</div>
        <div class="bill-card box">
            <div class="left box-f1">
                <p class="money">{{data.amount}}</p>
                <p class="text">已借款</p>
            </div>
            <div class="right box-f1">
                <p class="money">{{data.amountBalance}}</p>
                <p class="text">累计未归还</p>
            </div>
        </div>
        <div class="sec">付款情况</div>
        <div class="bill-card box">
            <div class="left box-f1">
                <p class="money">{{data.paidAmount}}</p>
                <p class="text">已付款({{data.paidRows}}笔)</p>
            </div>
            <div class="right box-f1">
                <p class="money">{{data.noPaidAmount}}</p>
                <p class="text">累计未付款({{data.noPaidRows}}笔)</p>
            </div>
        </div>
        <p class="bottom-note">
            备注：<br>
            1、每月25日为共享中心最后提交付款日，如遇休息日提前<br>
            2、最后提交付款日至月末共享审核通过单据将在次月1日开始提交付款
        </p>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';
    import axios from 'axios';

    export default {
        data() {
            return {
                arrow: require('../img/arrow-blue.png'),
                credit: [],
                data: []
            };
        },
        updated() {
            /* eslint-disable no-unused-vars */
            var bar = document.querySelectorAll('.bar-front');
            var self = this;

            setTimeout(function() {
                for (let i in self.credit) {
                    if (bar[i]) {
                        bar[i].style.width = (self.credit[i].decAvailable / self.credit[i].totoal * 100) + '%';
                    }
                }
            }, 100);
        },
        computed: {
            year() {
                var query = this.$route.query;
                return query.year;
            },
            month() {
                var query = this.$route.query;
                return query.month;
            }
        },
        methods: {
            loadData() {
                var self = this;
                var url1 = this.HOST + '?method=getBudgetDo&userNum=' + this.USERNUM + '&sessionID=' + this.SESSIONID;
                var url2 = this.HOST + '?method=getSearchPersonBill&userNum=' + this.USERNUM + '&year=' +
                    this.year + '&month=' + this.month + '&sessionID=' + this.SESSIONID;

                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });

                axios.all([
                    axios.get(url1),
                    axios.get(url2)
                ]).then(axios.spread(function (credit, numbers) {
                    // 上面两个请求都完成后，才执行这个回调方法
                    self.credit = credit.data.t;
                    self.data = numbers.data;

                    Indicator.close();
                }));
            }
        },
        created() {
            this.loadData();
        }
    };
</script>

<style lang="less" scoped src="../css/quota.less"></style>
<style lang="less" scoped>
    @import "../css/var.less";

    .monthbill {
        .list {
            color: @text-color3;
            .date {
                color: @text-color1;
            }
            &:first-child {
                border-bottom: none;
            }
        }
        .bill-card {
            padding: .52rem 0;
            text-align: center;
            background-color: #fff;
            .left {
                border-right: 1px solid #e0e0e0;
            }
            .money {
                font-size: .4rem;
            }
            .text {
                font-size: @sub-title-fsize;
                color: @text-color3;
                margin-top: .4rem;
            }
        }
        .bottom-note {
            line-height: 1.4;
        }
    }
</style>
