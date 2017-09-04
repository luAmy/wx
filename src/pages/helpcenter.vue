<template>
    <div class="helpcenter">
        <search @search="search"></search>
        <slide-tab :top="1.8" v-if="list.length > 0">
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
                    <div class='tabList clear' v-for="i in list.length" ref="scrollContent">
                        <a class="card clear" v-for="(item, index) in data"
                        @click="gotoDetail(item.id, item.title, item.modified, item.watchCount, item.attentionCount)"
                           v-if="i === 1 || getType[item.typeCode] === list[i-1]">
                            <div :style="{'background-image': 'url('+ item.coverUrl +')'}"
                                  alt="image" class="main-img left fl">
                            </div>
                            <div class="right fl">
                                <div class="title ell-2">{{item.title}}</div>
                                <div class="sub clear">
                                    <div class="view fl">
                                        <img :src="eyeImg" alt="" class="eye">
                                        <span class="num">{{item.watchCount}}</span>
                                    </div>
                                    <div class="like fl">
                                        <img :src="heartImg" alt="" class="heart">
                                        <span class="num">{{item.attentionCount}}</span>
                                    </div>
                                    <div class="status fr"
                                         :class="{geren: getType[item.typeCode] === list[1],
                                         hetong: getType[item.typeCode] === list[2],
                                         wuhetong: getType[item.typeCode] === list[3]}">
                                        {{getType[item.typeCode]}}
                                    </div>
                                </div>
                            </div>
                        </a>
                        <v-loading :isRequest="isRequest" :showEnd="showEnd" :msg="'没有更多了'"></v-loading>
                    </div>
                </div>
            </div>
        </slide-tab>
    </div>
</template>

<script>
    import search from '../components/search.vue';
    import slideTab from '../components/slideTab.vue';
    import { scrollController } from '../utils/common';

    export default {
        components: {
            search,
            slideTab,
            'v-loading': require('../components/loading.vue')
        },
        methods: {
            gotoDetail(id) {
//                http://agthl.com/vank/help_text/watch.do?id=47
                var url = this.HELPHOST + 'help_text/watch.do?id=' + id;

                this.$http.post(url).then(res => {
                });
                this.$router.push('/helpdetail?id=' + id);
            },
            getTab() {
                var url = this.HELPHOST + 'help_video/list_type.do';
                var list = [];

                this.$http.post(url).then(res => {
                    list = res.data.data;

                    var arr = [];
                    for (var i = 0; i < list.length; i++) {
                        arr.push(list[i].typeName);
                        this.getType[list[i].typeCode] = list[i].typeName;
                    }
                    this.list = ['首页'].concat(arr);
                });
            },
            loadData() {
                var url = this.HELPHOST + 'help_text/list.do?pageNum=' + this.curPage + '&pageSize=20&searchKey=' +
                    this.searchKey;
                if (this.curPage > 1) {
                    this.isRequest = true;
                }
                this.$http.post(url).then(res => {
                    this.isRequest = false;
                    var data = res.data.data.page.list;
//                    this.list = data.page.list;

                    if (!data || data.length === 0) {
                        if (this.curPage === 1) {
                            return false;
                        } else {
                            this.showEnd = true;
                        }
                        this.curPage--;
                    } else {
                        if (this.curPage === 1) this.data = [];
                        this.data = this.data.concat(data);
                    }
                }, err => {
                    this.isRequest = false;
                    this.curPage--;
                    console.log(err);
                }).catch((e) => {
                    this.isRequest = false;
                    console.log(e);
                });
            },
            loadMore () {
                if (this.showEnd) return;
                if (!this.isRequest) {
                    this.curPage++;
                    this.loadData();
                }
            },
            search(keyword) {
                this.searchKey = keyword;
                this.loadData();
            }
        },
        data() {
            return {
                list: [],
                exampleImg: require('../img/example.jpg'),
                eyeImg: require('../img/eye-gray.png'),
                heartImg: require('../img/heart.png'),
                data: [],
                getType: {},
                searchKey: '',
                curPage: 1,
                showEnd: false,
                isRequest: false
            };
        },
        created() {
            this.getTab();
            this.loadData();
        },
        updated() {
            var self = this;
            scrollController({
                ele: self.$refs.scrollContent,
                delay: 167,
                endCb () {
                    self.loadMore();
                }
            });
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";

    .search {
        top: 0 !important;
    }
    .helpcenter {
        height: 100%;
        .tabItem {
            top: 1rem;
            z-index: 9999 !important;
        }
        .tabCon {
            padding-top: 1.82rem;
            .tabList .card:last-child {
                border-bottom: none;
            }
            .card {
                display: block;
                position: relative;
                padding: .28rem;
                border-bottom: 1px solid #e0e0e0;
                .main-img {
                    width: 1.6rem;
                    height: 1.25rem;
                    margin-right: .28rem;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                .right {
                    width: 72%;
                    .title {
                        width: 100%;
                    }
                    .sub {
                        position: absolute;
                        width: 67%;
                        bottom: .28rem;
                        font-size: .22rem;
                        color: @text-color3;
                        img {
                            width: .3rem;
                            height: .3rem;
                        }
                        .view {
                            margin-right: .1rem;
                        }
                        .status {
                            /*width: 1.4rem;*/
                            height: .4rem;
                            line-height: .4rem;
                            text-align: center;
                            color: #fff;
                            &.geren {
                                background-color: #80c269;
                            }
                            &.hetong {
                                background-color: #f05050;
                            }
                            &.wuhetong {
                                background-color: @theme-color;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
