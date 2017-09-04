<template>
    <div class="know-credit">
        <div class="top" :style="{'background-image': 'url('+ require('../img/credit-bg.png') +')'}">
            <div class="rank">
                <span class="num">{{rank}}</span>
            </div>
            <div id="main"></div>
        </div>
        <div class="card rank-card">
            <div class="title">
                <hr>
                <span class="text">我的信用等级</span>
                <hr>
            </div>
            <div class="rainbow-bar clear">
                <div class="section fl" v-for="(item, index) in rainbowRank">
                    <p class="text status" v-if="rank > item.num[0] && rank < item.num[1]"
                       :style="{'background-color': item.bgColor[0]}">{{item.label}}
                        <span class="arrow"
                              :style="{'border-top-color': item.bgColor[0]}"></span>
                    </p>
                    <p class="text" v-else>{{item.label}}</p>
                    <div class="bar" :class="{first: index === 0, last: index === 3}" :style="{'background-image':
                    'linear-gradient(90deg,' + item.bgColor[0] + ',' + item.bgColor[1]}"></div>
                </div>
                <p class="nums"><span class="num" v-for="(item, index) in nums">{{item}}</span></p>
            </div>
        </div>
        <div class="sec">点滴信用，重在积累，提高信用方便你我</div>
        <div class="card info">
            <ul>
                <li>积极提交发票，影像上传及时</li>
                <li>提交发票足额、规范，体现个人信用</li>
                <li>单据附件内容完整，减少暂挂</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                rank: window.sessionStorage.getItem('creditScore'),
                nums: ['0', '60', '76', '91', '100'],
                rainbowRank: [
                    {
                        label: '需改进',
                        bgColor: ['#ff4539', '#ff4539'],
                        num: [0, 59]
                    },
                    {
                        label: '及格',
                        bgColor: ['#f98e2b', '#ff4e00'],
                        num: [60, 75]
                    },
                    {
                        label: '良好',
                        bgColor: ['#93d241', '#00af43'],
                        num: [76, 90]
                    },
                    {
                        label: '优秀',
                        bgColor: ['#11b0c0', '#007298'],
                        num: [91, 100]
                    }
                ]
            };
        },
        methods: {
            loadChart() {
                var echarts = require('echarts/lib/echarts');
                require('echarts/lib/chart/radar');

                var myChart = echarts.init(document.getElementById('main'));
                var option = {
                    title: {
                        text: '多雷达图'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        x: 'center'
                    },
                    radar: [
                        {
                            indicator: [
                                {text: '发票足额', max: 100},
                                {text: '填单规范', max: 100},
                                {text: '附件完整', max: 100},
                                {text: '修正及时', max: 100},
                                {text: '报销及时', max: 100}
                            ],
                            center: ['25%', '40%'],
                            radius: '38%',
//                            axisLine: {show: false},
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.2)'
                                }
                            },
                            name: {
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            splitArea: {show: false},
                            splitLine: {
                                lineStyle: {
                                    // 使用深浅的间隔色
                                    color: ['rgba(256,256,256,0.4)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)']
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            type: 'radar',
                            tooltip: {
                                trigger: 'item'
                            },
                            symbol: 'none',
                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data: [
                                {
                                    value: [90, 93, 55, 50, 90],
                                    areaStyle: {
                                        normal: {
                                            color: 'rgba(255, 255, 255, 0.5)'
                                        }
                                    },
                                    lineStyle: {
                                        normal: {
                                            color: 'rgba(255, 255, 255, 0)'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                };

                myChart.setOption(option);
            }
        },
        mounted() {
            this.loadChart();
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";

    #main {
        width: 195%;
        height: 7.2rem;
    }
    .know-credit {
        .top {
            position: relative;
            width: 100%;
            height: 6.39rem;
            background-size: cover;
            .rank {
                position: absolute;
                top: 37%;
                width: 97%;
                text-align: center;
                font-size: .8rem;
                font-weight: bold;
                color: #fff;
            }
        }
        .rank-card {
            padding: .44rem 0 .5rem;
            .title {
                text-align: center;
                color: @theme-color;
                hr {
                    width: 1.06rem;
                    height: .02rem;
                    vertical-align: middle;
                    display: inline-block;
                    border: none;
                    background-color: @theme-color;
                    &:first-child {
                        margin-right: .15rem;
                    }
                    &:last-child {
                        margin-left: .15rem;
                    }
                }
            }
        }
        .rainbow-bar {
            width: 5.6rem;
            margin: .44rem auto 0;
            text-align: center;
            font-size: .2rem;
            color: @text-color3;
            .section {
                position: relative;
                width: 1.4rem;
                height: .65rem;
                .bar {
                    position: absolute;
                    width: 1.4rem;
                    height: .06rem;
                    top: .4rem;
                    /*margin: .16rem 0 .2rem;*/
                    &.first {
                        border-top-left-radius: .1rem;
                        border-bottom-left-radius: .1rem;
                    }
                    &.last {
                        border-top-right-radius: .1rem;
                        border-bottom-right-radius: .1rem;
                    }
                }
                .text {
                    &.status {
                        width: .6rem;
                        height: .36rem;
                        line-height: .36rem;
                        margin: -.04rem auto 0;
                        text-align: center;
                        color: #fff;
                        border-radius: .04rem;

                        .arrow {
                            display: block;
                            width: 0;
                            height: 0;
                            margin-left: .36rem;
                            border: .1rem solid transparent;
                            border-top: .1rem solid;
                        }
                        /*& + .bar {*/
                            /*margin-top: .12rem;*/
                        /*}*/
                    }
                }
            }
            .nums {
                width: 120%;
                margin-left: -.6%;
                text-align: left;
                .num {
                    display: inline-block;
                    width: 20%;
                }
            }
        }
        .sec {
            font-size: .26rem;
            color: @text-color1;
        }
        .info {
            padding: .4rem .28rem;
            ul {
                li {
                    color: @text-color2;
                    margin-bottom: .3rem;
                    &:before {
                        display: inline-block;
                        content: '·';
                        height: .28rem;
                        line-height: .28rem;
                        margin-right: .06rem;
                        font-size: .4rem;
                    }
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
</style>
