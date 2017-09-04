<template>
    <div class="bug-detail">
        <div class="card">
            <div class="title ell-2">
                {{data.decp}}
            </div>
            <div class="imgs clear">
                <div class="thumbnail fl" v-for="i in att" :style="{backgroundImage: 'url(' + BZIMG + i + ')'}"
                @click="preview(i, att)" v-if="isImage(i)" :a="isImage(i)" :b="i">
                </div>
            </div>
            <a :href="BZIMG + i" v-for="i in att" v-if="!isImage(i)"  class="file">
                {{getFileName(i).name + '.' + getFileName(i).file}}
            </a>
            <div class="sub clear">
                <div class="time fl" v-if="data.ctime">{{data.ctime.substring(0, 19)}}</div>
                <div class="status fail fr" v-if="data.status === '打回处理'">{{data.status}}</div>
                <div class="status default fr" v-else>{{data.status}}</div>
            </div>
        </div>
        <div class="line">处理详情</div>
        <div class="card clear">
            <div class="section" :class="{'not-back': data.status !== '打回处理'}">
                <!--打回的时间轴-->
                <div class="timeline" v-if="data.status === '打回处理'">
                    <div class="sec-item current">
                        <div class="progress">
                            <div class="dot"></div>
                            <div class="progress-line"></div>
                        </div>
                        <span class="title">打回意见：{{data.reason}}</span>
                        <!--<div class="time" v-if="data.close">{{data.close.substring(0, 19)}}</div>-->
                    </div>
                    <div class="sec-item">
                        <div class="progress">
                            <div class="dot"></div>
                            <div class="progress-line"></div>
                        </div>
                        <span class="title">处理意见：{{data.option}} 处理人：{{data.hander}}
                    </span>
                        <!--<div class="time"></div>-->
                    </div>
                </div>
                <!--打回之前各状态-->
                <div class="handle">
                    <!--您的问题待处理，前面还有 个事件排队中-->
                    <!--<span class="text" v-if="data.status === '已提交'">您的问题待处理，前面还有{{data.qnum}}个事件排队中，-->
                        <!--紧急报障请拨打热线电话<a :href="'tel:' + data.tel" class="tel">{{data.tel}}</a>（内线111）-->
                    <!--</span>-->
                    <span class="text" v-if="data.status === '已提交'">您的问题待处理，前面还有{{data.qnum}}个事件排队中</span>
                    <span class="text" v-if="data.status === '处理中'">您的问题处理中，处理人：{{data.hander}}
                        <a :href="'tel:' + data.tel" class="tel">{{data.tel}}</a></span>
                    <span class="text" v-if="data.status === '已处理'">处理意见：{{data.option}} 处理人：{{data.hander}}
                    </span>
                    <span class="text" v-if="data.status === '已解决'">处理意见：{{data.option}} 处理人：{{data.hander}}
                    </span>
                </div>
                <div class="stamp" :style="{backgroundImage: 'url('+ stampBack +')'}"
                v-if="data && data.status === '打回处理'"></div>
            </div>
            <router-link class="report-back fr" v-if="data && data.status === '已解决'" :to="'bugback?eid=' + $route.query.eid">
                打 回
            </router-link>
        </div>
    </div>
</template>

<script>
    import wx from '../utils/wx';

    export default {
        data() {
            return {
                solved: 0,
                bug: require('../img/invoice1.jpg'),
                stampBack: require('../img/stamp-back.png'),
                att: [],
                data: {},
                image: ['jpg', 'jpeg', 'png', 'gif', 'bmp']
            };
        },
        created() {
            var eid = this.$route.query.eid;
            var url = this.BZHOST + '/operation/common/Common-mView?eid=' + eid; // + eid;

            this.$http.post(url).then(res => {
                this.att = res.data.att;
                this.data = res.data.data;
                this.preview();
            });
        },
        methods: {
            ifChinese(str) {
                var myReg = /.*[\u4e00-\u9fa5]+.*$/;
                if (myReg.test(str)) {
                    return true;
                } else {
                    return false;
                }
            },
            isImage(src) {
                var file = src.split('.')[1];
                if (this.ifChinese(file)) {
                    file = src.split('.')[2];
                }
                if (this.image.indexOf(file) !== -1) {
                    return true;
                } else {
                    return false;
                }
            },
            getFileName(src) {
                return {
                    name: src.split('.')[1],
                    file: src.split('.')[2]
                };
            },
            preview(src, arr) {
                var urls = [];

                for (let i in arr) {
                    var file = i.split('.')[1];
                    if (this.image.indexOf(file) !== -1) {
                        urls.push(this.BZIMG + i);
                    }
                }
                wx.preview(this.BZIMG + src, urls);
            }
        }
    };
</script>

<style lang="less" scoped src="../css/timeline.less"></style>
<style lang="less" scoped>
    @import "../css/var.less";

    .bug-detail {
        .line {
            font-size: @card-sub-fsize;
            border-bottom: 1px solid #e0e0e0;
        }
        .card {
            position: relative;
            padding: .3rem;
            margin-bottom: .2rem;
            a.file {
                color: @theme-color;
                text-decoration: underline;
                display: block;
                font-size: .28rem;
            }
            &:last-child {
                min-height: 3rem;
            }
            .title {
                margin-bottom: .32rem;
            }
            .sub {
                height: .3rem;
                line-height: .3rem;
                margin-top: .22rem;
                .time {
                    font-size: @sub-title-fsize;
                    color: @text-color3;
                }
                .status {
                    &.fail {
                        background-color: @warn-color;
                    }
                    &.default {
                        background-color: #5ac83c;
                    }
                }
            }
            .imgs {
                text-align: left;
                margin-bottom: .2rem;
                .thumbnail {
                    width: 1.3rem;
                    height: 1.3rem;
                    margin-right: .12rem;

                    background-size: cover;
                    background-position: center;
                    overflow: hidden;
                    text-align: center;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
            .section {
                margin: 0;
                padding: 0;
                .text {
                    font-size: .28rem;
                    color: #666;
                }
                .timeline {
                    padding-top: .2rem;
                }
                .sec-item {
                    padding-top: .1rem;
                    border: none;
                    .progress {
                        height: .3rem ;
                        .dot {
                            top: .24rem;
                        }
                    }
                    .title {
                        color: @text-color2;
                    }
                    .time {
                        padding-top: 0;
                    }
                    &.current {
                        padding: 0;
                        .progress {
                            height: .52rem;
                        }
                        .title {
                            color: @theme-color;
                            margin-bottom: .22rem;
                        }
                    }
                }
            }
            .stamp {
                position: absolute;
                right: .2rem;
                bottom: .2rem;
                width: 100%;
                height:1.4rem;
                background-size: 1.2rem 1.2rem;
                background-repeat: no-repeat;
                background-position: bottom right ;
                &.not-back {
                    background-image: none !important;
                }
            }
            .report-back {
                position: absolute;
                right: .28rem;
                bottom: .28rem;
                width: 1rem;
                height: .5rem;
                line-height: .5rem;
                font-size: @sub-title-fsize;
                text-align: center;
                color: @warn-color;
                border: 1px solid @warn-color;
                border-radius: .04rem;

                margin-top: .14rem;
                box-sizing: border-box;
            }
        }
    }
</style>
