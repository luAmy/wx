<template>
    <div class="credit">
        <div class="top" :style="{'background-image': 'url('+ require('../img/credit-bg.png') +')'}">
            <div id="rotate">
                <img id="pointer" :src="pointer" alt="pointer" class="pointer"/>
            </div>
            <canvas id="canvas" :width="width" :height="height" data-score="" data-name="" data-rank=""
                    data-time=""></canvas>
            <div class="btns">
                <a @click="toggleOverlay" class="showCredit">晒晒分</a>
                <router-link :to="'/knowcredit'" class="knowCredit">了解分</router-link>
            </div>
        </div>
        <div class="list">
            <div class="text">信用日志</div>
        </div>
        <div class="card">
            <div class="section">
                <div class="sec-item" v-for="(item, index) in data.logs" :class="{current: index === 0}">
                    <div class="progress">
                        <div class="dot"></div>
                        <div class="progress-line"></div>
                    </div>
                    <span class="title">{{item.scoreName}}</span>
                    <img v-if="item.originalScore > item.changeScore" :src="arrowDown" alt="arrowDown" class="arrow">
                    <img v-if="item.originalScore < item.changeScore" :src="arrowUp" alt="arrowUp" class="arrow">
                    <div class="sub-title">{{item.des}}</div>
                    <div class="time">{{item.changeDate}}</div>
                </div>
                <empty :flag="dataEmpty"></empty>
            </div>
        </div>
        <div class="overlay" v-show="overlayShow" @click="toggleOverlay">
            <img :src="overlayText" alt="点击右上角分享" class="text">
        </div>
    </div>
</template>

<script>
    import { panChart } from '../components/panChart.js';
    import { quickSort } from '../utils/sortArr';
    import empty from '../components/empty.vue';
    import wx from '../utils/wx';

    export default {
        components: {
            empty
        },
        computed: {
            width() {
                return document.documentElement.clientWidth;
            },
            height() {
                return document.documentElement.clientWidth / 7.5 * 6;
            }
        },
        data() {
            return {
                arrowUp: require('../img/credit-arrow-up.png'),
                arrowDown: require('../img/credit-arrow-down.png'),
                pointer: require('../img/pointer2.png'),
                overlayText: require('../img/shaishaifen.png'),
                overlayShow: false,
                data: '',
                list: [],
                creditScore: 0,
                showPointer: false,
                dataEmpty: false
            };
        },
        methods: {
            toggleOverlay() {
                this.overlayShow = !this.overlayShow;
            },
            getCredit() {
                var url = this.HOST + '?method=getCredits&userNum=' + this.USERNUM + '&sessionID=' + this.SESSIONID;

                this.$http.get(url).then(res => {
                    this.creditRank = res.data.scoreName;
                    this.data = res.data;
                    window.sessionStorage.setItem('creditData', JSON.stringify(res.data));

                    this.setAttrs();
                });
            },
            setAttrs() {
                var data = this.data;
                var creditScore = data.creditScore;
                var name = '';
                console.log('分享初始化');
                wx.share(creditScore);

                if (creditScore < 60) {
                    name = '需改进';
                } else if (creditScore < 76) {
                    name = '及格';
                } else if (creditScore < 91) {
                    name = '良好';
                } else if (creditScore < 100) {
                    name = '优秀';
                }

                if (!this.data.logs || this.data.logs.length === 0) {
                    this.dataEmpty = true;
                } else {
                    this.dataEmpty = false;
                }

                var scoreName = data.scoreName || name;
                // 给js插件赋值
                var canvas = document.getElementById('canvas');
                canvas.setAttribute('data-name', creditScore);
                canvas.setAttribute('data-rank', scoreName);
                canvas.setAttribute('data-time', '2017-07-01');

                window.sessionStorage.setItem('creditScore', data.creditScore);
                this.creditScore = data.creditScore;
                this.showPointer = true;

                // 渲染图表
                this.loadChart();
            },
            loadData() {
                var creditData = window.sessionStorage.getItem('creditData');
                if (!creditData) {
                    this.getCredit();
                } else {
                    var data = JSON.parse(creditData);

                    this.data = data;
                    this.data.logs = quickSort(this.data.logs, 'changeDate', false);
                    this.setAttrs();
                }
            },
            loadChart() {
                panChart();
                // a:     transform: rotate(17deg); data-score=500
                // b: 61deg 598
                // c: 105deg 700
                // d: 149deg 798
                var rotate = document.getElementById('rotate');
                var score = this.creditScore;
                var num = (score / 100) * 218 - 28;
                if (score > 50) {
                    rotate.style.transition = 'all .8s ease-out';
                }
                rotate.style.transform = 'rotate(' + num + 'deg)';
            }
        },
        mounted() {
            this.loadData();
        },
        created() {

        }
    };
</script>

<style lang="less" scoped src="../css/timeline.less"></style>
<style lang="less" scoped>
    @import "../css/var.less";

    canvas {
        margin: 0 auto;
    }
    .empty {
        margin-top: -.5rem;
        padding-top: 0 !important;
    }
    .credit {
        position: relative;
        min-height: 100%;
        .top {
            width: 100%;
            height: 6.39rem;
            position: relative;
            background-size: cover;
            #rotate {
                position: absolute;
                top: 2.5rem;
                left: 1.78rem;
                width: 1.98rem;
                transform-origin: right bottom;
                transform: rotate(-28deg);
                transition: all .55s ease-out;
                /*outline: 1px solid #f00;*/
                .pointer {
                    width: .9rem;
                    height: .5rem;
                    transform: rotate(38deg);
                }
            }
            .btns {
                position: absolute;
                width: 100%;
                bottom: 1.68rem;
                text-align: center;
                a {
                    display: inline-block;
                    width: 1.74rem;
                    height: .6rem;
                    line-height: .6rem;
                    font-size: .28rem;
                    color: #fff;
                    border: 1px solid #fff;
                    border-radius: .05rem;
                    &:first-child {
                        margin-right: .64rem;
                    }
                }
            }
        }
        .list {
            .text {
                color: @text-color1;
            }
        }
        .section {
            margin: 0;
            .title {
                font-size: @cell-title-fsize;
            }
            .arrow {
                width: .2rem;
                height: .34rem;
                margin-left: .16rem;
                margin-top: -.06rem;
            }
            .sub-title {
                font-size: @sub-title-fsize;
                color: @text-color2;
            }
        }
        .overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 999999;
            img {
                position: absolute;
                top: .3rem;
                right: .8rem;
                width: 2.67rem;
            }
        }
    }

    .section .sec-item.current {
        .progress {
            top: .05rem;
        }
        .time {
            color: @text-color3;
        }
    }

    .section .sec-item:last-child .progress .dot {
        top: .47rem;
    }
</style>
