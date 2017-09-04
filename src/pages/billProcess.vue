<template>
    <div class="block">
        <div class="current-block" v-if="inSection === -1 && data.currentProcStr">
            <!--当前节点，不属于共享或一级区域-->
            <div class="section">
                <div class="sec-item current">
                    <div class="progress">
                        <div class="dot"></div>
                        <div class="progress-line" v-if="outside.length > 0"></div>
                    </div>
                    <span
                        class="title">{{data.currentProcStr}}</span>&nbsp;{{data.OperatorStr ? '经办人：' + data.OperatorStr : ''}}
                    <div class="time" v-if="data.nowStr">{{data.nowStr}}</div>
                </div>
                <!--其他不属于共享或一级区域节点-->
                <div class="sec-item" v-for="(item, index) in outside"
                     :class="{current: index === 0 && !data.currentProcStr}">
                    <div class="progress">
                        <div class="dot"></div>
                        <!--v-if="(outside.length > 1 && index !== outside.length -1)"-->
                        <div class="progress-line" v-if="(data.currentProcStr)"></div>
                    </div>
                    <span class="title">
                        {{item.proc ? item.proc + '&nbsp;' : ''}}
                    </span>{{item.str}}&nbsp;{{item.operator ? '经办人：' + item.operator : ''}}
                    <!--<span class="title">最终审批</span>不同意 审批意见：因某原因不通过 经办人：张莹<span class="tel"></span>-->
                    <div class="time">{{item.time}}</div>
                </div>
            </div>
        </div>

        <div class="template">
            <!--共享审核区域-->
            <div class="sec-title" v-if="inSection === 1 || section1.length > 0">
                <hr>
                <span class="text">共享审核<span class="time">{{sectionTime1}}</span></span>
                <hr>
            </div>
            <div class="section" v-if="inSection === 1 || section1.length > 0">
                <!--共享审批当前节点-->
                <div class="sec-item current" v-if="inSection === 1">
                    <div class="progress">
                        <div class="dot"></div>
                        <div class="progress-line" v-if="section1.length > 0"></div>
                    </div>
                    <span
                        class="title">{{data.currentProcStr}}</span>&nbsp;{{data.OperatorStr ? '经办人：' + data.OperatorStr : ''}}
                    <div class="time" v-if="data.nowStr">{{data.nowStr}}</div>
                </div>
                <!--共享审批其他节点，section1-->
                <div class="sec-item" v-for="(item, index) in section1"
                     :class="{current: index === 0 && !data.currentProcStr}">
                    <div class="progress">
                        <div class="dot"></div>
                        <div class="progress-line" v-if="section1.length > 1"></div>
                    </div>
                    <span
                        class="title">{{item.proc ? item.proc + '&nbsp;' : ''}}</span>{{item.str}}&nbsp;{{item.operator ? '经办人：' + item.operator : ''}}
                    <div class="time">{{item.time}}</div>
                </div>
            </div>
            <!--一线审批区域-->
            <div class="sec-title" v-if="inSection === 2 || section2.length > 0">
                <hr>
                <span class="text">一线审批<span class="time">{{sectionTime2}}</span></span>
                <hr>
            </div>
            <div class="section" v-if="inSection === 2 || section2.length > 0">
                <!--一线审批当前节点-->
                <div class="sec-item current" v-if="inSection === 2">
                    <div class="progress">
                        <div class="dot"></div>
                        <div class="progress-line" v-if="section2.length > 0"></div>
                    </div>
                    <span
                        class="title">{{data.currentProcStr}}</span>&nbsp;{{data.OperatorStr ? '经办人：' + data.OperatorStr : ''}}
                    <div class="time" v-if="data.nowStr">{{data.nowStr}}</div>
                </div>
                <!--一线审批其他节点-->
                <div class="sec-item" v-for="(item, index) in section2"
                     :class="{current: index === 0 && !data.currentProcStr && !(section1.length > 0)}">
                    <div class="progress">
                        <div class="dot"></div>
                        <div class="progress-line" v-if="section2.length > 1"></div>
                    </div>
                    <span
                        class="title">{{item.proc ? item.proc + '&nbsp;' : ''}}</span>{{item.str}}&nbsp;{{item.operator ? '经办人：' + item.operator : ''}}
                    <div class="time">{{item.time}}</div>
                </div>
            </div>
        </div>
        <empty :flag="dataEmpty" :text="'没有符合条件的数据'"></empty>
    </div>
</template>

<script>
    import empty from '../components/empty.vue';
    import axios from 'axios';

    export default {
        components: {
            empty
        },
        props: ['number'],
        data () {
            return {
                data: '',
                inSection: -1,
                section1: [],
                section2: [],
                outside: [],
                dataEmpty: false
            };
        },
        computed: {
            sectionTime1() {
                var sectionTime1 = 0;
                var len = this.section1.length - 1;
                var nowStr = this.data.nowStr;
                if (this.inSection === 1 && nowStr) {
                    sectionTime1 = this.getTimestamp(nowStr) - this.getTimestamp(this.section1[len].time);
                } else {
                    sectionTime1 = this.getTimestamp(this.section1[0].time) - this.getTimestamp(this.section1[len].time);
                }
                if (sectionTime1 === 0 || isNaN(sectionTime1 / 3600)) {
                    return '(0小时)';
                } else {
                    return '(' + Math.round(sectionTime1 / 3600) + '小时)';
                }
            },
            sectionTime2() {
                var sectionTime2 = 0;
                var len = this.section2.length - 1;
                var nowStr = this.data.nowStr;
                if (this.inSection === 2 && nowStr) {
                    sectionTime2 = this.getTimestamp(nowStr) - this.getTimestamp(this.section2[len].time);
                } else {
                    sectionTime2 = this.getTimestamp(this.section2[0].time) - this.getTimestamp(this.section2[len].time);
                }
                if (sectionTime2 === 0 || isNaN(sectionTime2 / 3600)) {
                    return '(0小时)';
                } else {
                    return '(' + Math.round(sectionTime2 / 3600) + '小时)';
                }
            }
        },
        methods: {
            /* eslint-disable no-unused-vars */
            getTimestamp(str) {
                var timestamp2 = Date.parse(new Date(str));
                timestamp2 = timestamp2 / 1000;
                return timestamp2;
            },
            getTitle() {
                var data = this.data;
                var title1 = -1;
                var title2 = -1;
                var section1 = [];
                var section2 = [];
                var outside = [];

                if (!data.t) {
                    return;
                }
                for (let i = 0; i < data.t.length; i++) {
                    // 分界点在区域上一个
                    // 共享审批分界
                    if (data.t[i].proc.indexOf('提交付款') !== -1) {
                        title1 = i;
                        console.log('a:' + title1);
                    }
                    // 一级审批分界
                    if (data.t[i].proc.indexOf('一级审批') !== -1) {
                        title2 = i;
                    }
                }
                if (title1 >= 0) {
                    // 第一节就是共享审批分界点
                    // 第一个放到共享审批外
                    if (title1 === 0) {
//                        outside.push(data.t[0]);
                    } else {
                        for (let i = 0; i < title1 + 1; i++) {
                            outside.push(data.t[i]);
                        }
                    }
                    for (let i = title1 + 1; i < title2 + 1; i++) {  // 去掉加1？
                        section1.push(data.t[i]);
                    }
                    for (let i = title2 + 1; i < data.t.length; i++) {
                        section2.push(data.t[i]);
                    }
                    console.log(title2 + 1);
                    console.log(data.t.length - 1);
                } else if (title1 === -1) {
                    if (title2 >= 0) {
                        for (let i = 0; i < title2 + 1; i++) {
                            section1.push(data.t[i]);
                        }
                        for (let i = title2 + 1; i < data.t.length; i++) {
                            section2.push(data.t[i]);
                        }
                    } else {
                        for (let i = 0; i < data.t.length; i++) {
                            section2.push(data.t[i]);
                        }
                    }
                }
                // 判断当前节点放到共享审批还是一级，否则放到外面
                if (data.currentProcStr) {
                    if (data.currentProcStr.indexOf('提交付款') !== -1) {
                        this.inSection = 1;
                    }
                    if (data.currentProcStr.indexOf('一级审批') !== -1) {
                        this.inSection = 2;
                    }
                }
                this.section1 = section1;
                this.section2 = section2;
                this.outside = outside;
//                console.log('title1:' + title1);
//                console.log('title2:' + title2);
            }
        },
        created() {
            var url = this.HOST + '?method=getProcDetails&number=' + this.number + '&sessionID=' + this.SESSIONID;
            axios.post(url).then(res => {
                this.data = res.data;
                if (this.data.t.length > 0 || this.data.currentProcStr) {
                    this.getTitle();
                } else {
                    this.dataEmpty = true;
                }
            });
        }
    };
</script>

<style lang="less" scoped src="../css/timeline.less"></style>
<style lang="less" scoped>
    @import "../css/var.less";

    .block {
        margin-top: .3rem;
        padding-bottom: .8rem;
    }

    .section {
        .sec-item {
            font-size: .28rem;
            line-height: 1.5;
            .time {
                padding-top: .08rem;
                /*font-size: .2rem;*/
            }
        }
    }

    .sec-title {
        padding: 0 .28rem .3rem;
        font-size: @sub-title-fsize;
        color: @text-color1;
        text-align: right;
        .text {
            display: inline-block;
            min-width: 2.2rem;
            font-size: .28rem;
            text-align: center;
        }
        .time {
            color: @text-color3;
            font-size: .2rem;
        }
        hr {
            width: 1.84rem;
            height: 1px;
            display: inline-block;
            border: none;
            background-color: #e0e0e0;
            &:first-child {
                margin-right: .1rem;
            }
            &:last-child {
                margin-left: -.04rem;
            }
        }
    }
</style>
