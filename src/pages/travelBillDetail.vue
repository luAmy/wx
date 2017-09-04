<template>
    <div class="billdetail">
        <div class="detailhead clear">
            <div class="avatar fl" :style="{backgroundImage: 'url('+ icon +')'}">
            </div>
            <div class="text fl">
                <div class="billstatus">
                    单据状态：<span class="status">{{state}}</span>
                </div>
                <div class="note">
                    款项说明：{{cause}}
                </div>
                <div class="money">
                    金额：{{money | formatMoney}}
                </div>
            </div>
        </div>
        <div class="block">
            <template>
                <div class="sec">
                    基本信息
                </div>
                <div class="list clear">
                    <div class="text fl">单号</div>
                    <div class="value fr">{{$route.query.billNum}}</div>
                </div>
                <!--接口里没有-->
                <div class="list clear">
                    <div class="text fl">差旅类型</div>
                    <div class="value fr" v-if="data[0]">{{data[0].expense}}</div>
                </div>
                <div class="sec">
                    行程信息
                </div>
                <div class="section" v-for="(item, index) in data">
                    <div class="travelcard" :style="{backgroundImage: 'url('+ cardSrc +')'}">
                        <div class="list-all">
                            <div class="card">
                                <div class="left">
                                    <p class="location">{{item.fro}}</p>
                                    <p class="time">{{item.startDate.substring(0, 10)}}</p>
                                </div>
                                <div class="right">
                                    <p class="location">{{item.fto}}</p>
                                    <p class="time">{{item.endDate.substring(0, 10)}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="list clear xingcheng">
                        <div class="chuchai fl">
                            <span class="text">出差人：</span>{{item.travelPerson}}
                        </div>
                        <div class="baoxiao fr">
                            <span class="text">报销部门：</span>{{item.center}}
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: window.localStorage.getItem('billname'),
                cause: window.localStorage.getItem('cause'),
                state: this.BILLSTATE[window.localStorage.getItem('state')],
                money: window.localStorage.getItem('money'),
                data: [],
                cardSrc: require('../img/travelcard.png'),
                array: ['出发地', '出发时间', '目的地', '到达时间']
            };
        },
        computed: {
            icon() {
                var src = window.localStorage.getItem('billicon') || require('../img/feiyongbaoxiao.png');
                return src;
            }
        },
        created() {
            var self = this;
            var billNum = this.$route.query.billNum;
            var method = this.DETAILARR[this.name];
            this.billNum = billNum;

            var url = this.HOST + '?method=' + method + '&number=' + billNum + '&sessionID=' + this.SESSIONID;
            this.$http.post(url).then(res => {
                self.data = res.data.t;
//                for (var i = 0; i < data.length; i++) {
//                    self.datalist = data[i].data;
//                    console.log(self.datalist);
//                }
            });
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";
    @import "../css/mixins.less";

    .billdetail {
        .detailhead {
            position: absolute;
            top: 0;
            z-index: 999;
            width: 100%;
            height: 1.8rem;
            padding: .26rem .28rem .32rem;
            background-color: @theme-color;
            color: #fff;
            .text {
                margin-left: .3rem;
                margin-top: .1rem;
                div {
                    line-height: 1;
                }
            }
            .avatar {
                width: 1.1rem;
                height: 1.1rem;
                margin-top: .1rem;
                background-size: .6rem;
                background-repeat: no-repeat;
                background-position: center;
                background-color: #fff;
            }
            .billstatus {
                font-size: .28rem;
                margin-bottom: .1rem;
                .status {
                    display: inline-block;
                    background-color: #fff;
                    color: #51c693;
                    height: .28rem;
                    line-height: .28rem;
                    font-size: .22rem;
                    padding: 0 .075rem;
                    border-radius: .04rem;
                }
            }
            .note {
                font-size: .32rem;
                margin-bottom: .14rem;
            }
            .money {
                font-size: @sub-title-fsize;
            }
        }
        .block {
            margin-top: 1.8rem;
        }
        .section {
            margin-bottom: .2rem;
        }
    }

    .basic {
        border-bottom: 1px solid #e0e0e0;
    }

    .travelcard {
        position: relative;
        /*margin-bottom: .2rem;*/
        padding-top: 2.2rem;

        background-color: #fff;
        background-repeat: no-repeat;
        background-size: 7rem 1.92rem;
        background-position: .28rem .28rem;
        border-top: 1px solid #e0e0e0;
    }

    .card {
        padding: .1rem 0;
        text-align: center;
        background-color: #fff;
        color: #fff;
        .left, .right {
            width: 3rem;
            height: 1rem;
            position: absolute;
            top: .82rem;
            .location {
                font-weight: bold;
                font-size: .34rem;
            }
            .time {
                font-size: .2rem;
                margin-top: .2rem;
            }
        }
        .left {
            left: .5rem;
        }
        .right {
            right: .5rem;
        }
    }

    .list {
        position: relative;
        height: 1rem;
        line-height: 1rem;
        padding: 0 .28rem;
        font-size: @cell-title-fsize;
        background-color: #fff;
        border-bottom: 1px solid #e0e0e0;
        .text {
            color: @text-color3;
        }
        .baoxiao {
            position: absolute;
            /*top: -1rem;*/
            right: .28rem;
            color: @text-color3;
            font-size: .28rem;
        }
    }

    .list-card, .list-baoxiao {
        height: 0 !important;
        border: none !important;
    }
</style>
