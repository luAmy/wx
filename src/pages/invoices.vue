<template>
    <div class="invoices">
        <div class="card card-one">
            <ul class="menu box">
                <li v-for="(item, index) in menu" class="cate box-f1" @click="changeTab">
                    <img v-if="index === activeIndex" :src="require('../img/' + item.img + '-act.png')" :alt="item.name" class="icon">
                    <img v-else :src="require('../img/' + item.img + '.png')" :alt="item.name" class="icon">
                    <p class="text" :class="{active: index === activeIndex}">{{item.name}}</p>
                </li>
            </ul>
        </div>
        <div class="card card-two">
            <div class="time-choose clear">
                <div class="time fl" id="startTime">2017-05-19</div>
                <div class="joint fl">-</div>
                <div class="time fl" id="endTime">2017-05-20</div>
            </div>
            <div class="tab">
                <div class="section">
                    <div class="date">2017-5-19</div>
                    <div class="imgs clear">
                        <div class="thumbnail fl">
                            <img :src="invoice" alt="invoice" class="invoice">
                        </div>
                        <div class="thumbnail fl">
                            <img :src="invoice" alt="invoice" class="invoice">
                        </div>
                        <div class="thumbnail fl">
                            <img :src="invoice" alt="invoice" class="invoice">
                        </div>
                        <div class="thumbnail fl">
                            <img :src="invoice" alt="invoice" class="invoice">
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="date">2017-5-19</div>
                    <div class="imgs box">
                        <div class="thumbnail fl">
                            <img :src="invoice" alt="invoice" class="invoice">
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="date">2017-5-19</div>
                    <div class="imgs box">
                        <div class="thumbnail fl">
                            <img :src="invoice" alt="invoice" class="invoice">
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="date">2017-5-19</div>
                    <div class="imgs box">
                        <div class="thumbnail fl">
                            <img :src="invoice" alt="invoice" class="invoice">
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="date">2017-5-19</div>
                    <div class="imgs box">
                        <div class="thumbnail fl">
                            <img :src="invoice" alt="invoice" class="invoice">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <img class="dot upload" :src="dotImg" @click="$router.push('/uploadinvoice')">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: 0,
                invoice: require('../img/invoice1.jpg'),
                dotImg: require('../img/invoice-upload.png'),
                menu: [
                    {
                        name: '全部',
                        img: 'invoice-all'
                    },
                    {
                        name: '餐饮',
                        img: 'invoice-cater'
                    },
                    {
                        name: '通讯',
                        img: 'invoice-phone'
                    },
                    {
                        name: '交通',
                        img: 'invoice-plane'
                    },
                    {
                        name: '其他',
                        img: 'invoice-else'
                    }
                ]
            };
        },
        methods: {
            changeTab() {

            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";

    .invoices {
        padding: .2rem .28rem;
        height: 100%;
        .card-one{
            margin-bottom: .2rem;
            .menu {
                padding: .35rem .24rem;
                font-size: @sub-title-fsize;
                color: @text-color3;
                text-align: center;
                img {
                    width: .5rem;
                    margin-bottom: .14rem;
                }
                .text {
                    &.active {
                        color: @theme-color;
                    }
                }
            }
        }
        .card-two {
            padding: .24rem .28rem;
            height: 84%;
            .time-choose {
                div {
                    height: .56rem;
                    line-height: .56rem;
                    text-align: center;
                }
                .time {
                    width: 3rem;
                    color: @text-color3;
                    background-color: #f3f4f6;
                }
                .joint {
                    width: .34rem;
                    font-size: .34rem;
                    color: #666;
                }
            }
            .tab {
                margin-top: .4rem;
                height: 90%;
                overflow-y: scroll;
            }
            .section {
                margin-bottom: .4rem;
                .date {
                    margin-bottom: .24rem;
                }
                .imgs {
                    text-align: left;
                    .thumbnail {
                        width: 1.5rem;
                        height: 1.5rem;
                        margin-right: .12rem;
                        overflow: hidden;
                        text-align: center;
                        &:last-child {
                            margin-right: 0;
                        }
                        img {
                            margin-left: 50%;
                            transform: translate(-50%);
                            height: 1.5rem;
                        }
                    }
                }
            }
        }
        .dot {
            position: absolute;
            right: .45rem;
            bottom: .45rem;
            width: .8rem;
        }
    }
</style>
