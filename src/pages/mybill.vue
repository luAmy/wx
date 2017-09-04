<template>
    <div>
        <div class="account clear">
            <div class="left fl">
                账户名：<span class="value">{{userinfo.userName}}</span>
            </div>
            <div class="right fr">
                账户ID：<span class="value">{{userinfo.userNum}}</span>
            </div>
        </div>
        <router-link class="card clear box"
                     :class="{anotherYear: (item.year < new Date().getFullYear()) && item.month === 12}"
                     v-for="(item, index) in data" :to="'/mybilldetail?year=' + item.year + '&month=' + item.month"
                     :key="index">
            <div class="card-main">
                <div class="month clear">
                    <div class="text fl">账单月份</div>
                    <div class="value fr">{{item.year + '-' + item.month}}</div>
                </div>
                <div class="date clear">
                    <div class="text fl">出账日期</div>
                    <div class="value fr">{{item.year + '-' + item.month + '-' + item.date}}</div>
                </div>
            </div>
            <img :src="arrow" alt="arrow" class="arrow fr">
        </router-link>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                arrow: require('../img/arrow-right.png')
            };
        },
        computed: {
            data() {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var oriMonth = date.getMonth() + 1;
                var arr = [];
                var day = date.getDate();

                for (var i = 0; i < 12; i++) {
                    // 如果今天小于25日
                    if (month === oriMonth && day < 25) {
                        month--;
                    }
                    var obj = {
                        year: year,
                        month: month,
                        date: 25
                    };
                    month--;
                    if (month < 1) {
                        year = new Date().getFullYear() - 1;
                        month = 12;
                    }
                    arr.push(obj);
                }
                return arr;
            },
            userinfo() {
                var userinfo = window.localStorage.getItem('userinfo');
                if (userinfo) {
                    return JSON.parse(userinfo);
                } else {
                    return '';
                }
            }
        },
        created() {
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";

    .value {
        color: @text-color3;
    }
    .account {
        padding: 0 .28rem;
        margin: .2rem 0;
        height: 1rem;
        line-height: 1rem;
        background-color: #fff;
    }
    .card {
        padding: .3rem .28rem;
        border-bottom: 1px solid #e0e0e0;
        &:last-child {
            border-bottom: none;
        }
        .card-main {
            flex: 1 1 auto;
            .month {
                margin-bottom: .2rem;
            }
        }
        .arrow {
            width: .14rem;
            height: .25rem;
            margin-left: .2rem;
            margin-top: .3rem;
        }
    }
    .anotherYear {
        margin-top: .2rem;
    }
</style>
