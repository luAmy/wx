<template>
    <div class="bug-history">
        <slide-tab>
            <div class="tabItem">
                <ul class='tabClick box'>
                    <li v-for="(item, index) in list" :class="{active:index===0}">
                        {{item}}
                    </li>
                </ul>
                <div class='lineBorder'>
                    <div class='lineDiv' :style="{width: 100/list.length + '%'}"><!--滑动条--></div>
                </div>
            </div>
            <div class='tabCon'>
                <div class='tabBox'>
                    <div class='tabList'>
                        <router-link v-for="(item, index) in data" :key="index" class="block" :to="'/bugdetail?eid=' + item.eid"
                        :a="JSON.stringify(item)">
                            <div class="line">事件编号：<span class="code">{{item.eid}}</span></div>
                            <div class="card">
                                <div class="title ell-2">
                                    {{item.desc}}
                                </div>
                                <div class="imgs clear">
                                    <div class="thumbnail fl" v-for="i in item.att" :style="{backgroundImage: 'url(' + BZIMG + i + ')'}"
                                         v-if="isImage(i)">
                                    </div>
                                </div>
                                <div class="sub clear">
                                    <div class="time fl">{{item.ctime | DateFormatSec}}</div>
                                    <div class="status fail fr">{{item.status}}</div>
                                </div>
                            </div>
                            <div class="list clear" v-if="item.option && item.option!='null'">
                                <div class="text fl">处理意见：</div>
                                <div class="value fl ellipsis">{{item.option}}</div>
                            </div>
                            <div class="list clear" v-if="item.reason && item.reason!='null'">
                                <div class="text fl">打回意见：</div>
                                <div class="value fl ellipsis">{{item.reason}}</div>
                                <router-link v-if="item.status === '已解决'" class="report-back fr" :to="'bugback?eid=' + item.eid">
                                    打 回
                                </router-link>
                            </div>
                        </router-link>
                    </div>
                    <div class='tabList'>
                        <router-link v-if="item.status !== '已解决'" :key="index" v-for="(item, index) in data" class="block" :to="'/bugdetail?eid=' + item.eid">
                            <div class="line">事件编号：<span class="code">{{item.eid}}</span></div>
                            <div class="card">
                                <div class="title ell-2">
                                    {{item.desc}}
                                </div>
                                <div class="imgs clear">
                                    <div class="thumbnail fl" v-for="i in item.att" :style="{backgroundImage: 'url(' + BZIMG + i + ')'}"
                                         v-if="isImage(i)">
                                    </div>
                                </div>
                                <div class="sub clear">
                                    <div class="time fl">{{item.ctime | DateFormatSec}}</div>
                                    <div class="status fail fr">{{item.status}}</div>
                                </div>
                            </div>
                            <div class="list clear" v-if="item.option && item.option!='null'">
                                <div class="text fl">处理意见：</div>
                                <div class="value fl ellipsis">{{item.option}}</div>
                            </div>
                            <div class="list clear" v-if="item.reason && item.reason!='null'">
                                <div class="text fl">打回意见：</div>
                                <div class="value fl ellipsis">{{item.reason}}</div>
                            </div>
                        </router-link>
                    </div>
                    <div class='tabList'>
                        <router-link v-if="item.status === '已解决'" :key="index" v-for="(item, index) in data" class="block" :to="'/bugdetail?eid=' + item.eid">
                            <div class="line">事件编号：<span class="code">{{item.eid}}</span></div>
                            <div class="card">
                                <div class="title ell-2">
                                    {{item.desc}}
                                </div>
                                <div class="imgs clear">
                                    <div class="thumbnail fl" v-for="i in item.att" :style="{backgroundImage: 'url(' + BZIMG + i + ')'}"
                                         v-if="isImage(i)">
                                    </div>
                                </div>
                                <div class="sub clear">
                                    <div class="time fl">{{item.ctime | DateFormatSec}}</div>
                                    <div class="status fail fr">{{item.status}}</div>
                                </div>
                            </div>
                            <div class="list clear" v-if="item.option && item.option!='null'">
                                <div class="text fl">处理意见：</div>
                                <div class="value fl ellipsis">{{item.option}}</div>
                            </div>
                            <div class="list clear" v-if="item.reason && item.reason!='null'">
                                <div class="text fl">打回意见：</div>
                                <div class="value fl ellipsis">{{item.reason}}</div>
                                <router-link v-if="item.status === '已解决'" class="report-back fr" :to="'bugback?eid=' + item.eid">
                                    打 回
                                </router-link>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </slide-tab>
    </div>
</template>

<script>
    import slideTab from '../components/slideTab.vue';
    import {compare} from '../utils/compareObj';

    export default {
        components: {
            slideTab
        },
        data() {
            return {
                stampPass: require('../img/stamp-complete.png'),
                list: ['全部', '未解决', '已解决'],
                bug: require('../img/invoice1.jpg'),
                data: [],
                image: ['jpg', 'jpeg', 'png', 'gif', 'bmp']
            };
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
            getTimestamp(str) {
                var timestamp2 = Date.parse(new Date(str));
                timestamp2 = timestamp2 / 1000;
                return timestamp2;
            }
        },
        created() {
            var url = this.BZHOST + '/operation/common/Common-mList?u=' + this.USERNUM;
            this.$http.post(url).then(res => {
                var arr = [];
                this.data = res.data;
                for (let i in this.data) {
                    this.data[i].ctime = this.getTimestamp(this.data[i].ctime);
                    arr.push(this.data[i]);
                }
                this.data = arr.sort(compare('ctime')).reverse();
            });
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";

    .bug-history {
        .tabCon {
            padding-top: .82rem;
            .block {
                position: relative;
                display: block;
                margin-top: .2rem;
                &.solved {
                    .stamp {
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 100%;
                        height: 1.72rem;
                        z-index: 999;

                        background-size: 1.72rem;
                        background-repeat: no-repeat;
                        background-position: 4.8rem -.3rem ;
                    }
                    .list {
                        &.solve {
                            .value {
                                max-width: 64%;
                            }
                        }
                    }
                }
                .line {
                    color: @text-color1;
                    font-size: @card-sub-fsize;
                    border-bottom: 1px solid #e0e0e0;
                    span {
                        color: @theme-color;
                    }
                }
                .list {
                    padding:0 .28rem;
                    height: .8rem;
                    line-height: .8rem;
                    display: block;
                    font-size: .28rem;
                    .text {
                        width: 1.4rem;
                    }
                    .value {
                        text-align: left;
                        max-width: 79%;
                    }
                    .report-back {
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
                    &:last-child {
                        border-bottom: none;
                    }
                }
                .card {
                    padding: .3rem;
                    border-bottom: 1px solid #e0e0e0;
                    .title {
                        margin-bottom: .32rem;
                    }
                    .sub {
                        height: .3rem;
                        line-height: .3rem;
                        margin-top: .42rem;
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
                        .thumbnail {
                            width: 1.3rem;
                            height: 1.3rem;
                            margin-right: .12rem;
                            overflow: hidden;
                            text-align: center;

                            background-size: cover;
                            background-position: center;
                            background-repeat: no-repeat;
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
        }
    }
</style>
