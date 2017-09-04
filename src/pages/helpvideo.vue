<template>
    <div class="helpvideo">
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
                        <!--<div class="btn">点击播放</div>-->
                        <div class="card fl" v-for="(item, index) in data"
                             v-if="i === 1 || getType[item.typeCode] === list[i-1]">
                            <div class="card-top">
                                <div class="cover" @click="play(item.id)" :style="{'background-image': 'url('+ overlayImg +')'}"></div>
                                <div class="main-img" :style="{'background-image': 'url('+ item.coverUrl +')'}"></div>
                                <div class="liveplayer">
                                    <video :src="item.contentUrl">
                                    </video>
                                </div>
                                <div class="view">
                                    <img :src="eyeImg" alt="eye" class="eye">
                                    <span class="num">{{item.watchCount}}</span>
                                </div>
                            </div>
                            <div class="bottom">
                                <p class="title ell-2">{{item.title}}</p>
                                <p class="cate">{{getType[item.typeCode]}}</p>
                            </div>
                        </div>
                    </div>
                    <!--<v-loading :isRequest="isRequest" :showEnd="showEnd" :msg="'没有更多消息了'"></v-loading>-->
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
        data() {
            return {
                list: [],
                exampleImg: require('../img/example.png'),
                eyeImg: require('../img/eye.png'),
                overlayImg: require('../img/overlay.png'),
                data: [],
                getType: {},
                searchKey: '',
                curPage: 1,
                showEnd: false,
                isRequest: false
            };
        },
        methods: {
            play(id) {
                this.addWatch(id);
            },
            addEvent() {
                var $livePlayer = document.getElementsByClassName('liveplayer');
                var $video = document.getElementsByTagName('video');
                var $playBtn = document.getElementsByClassName('cover'); // btn

                for (let index = 0; index < $playBtn.length; index++) {
                    $playBtn[index].addEventListener('click', function() {
                        $livePlayer[index].style.display = 'block';
                        $video[index].style.display = 'block';
                        $video[index].play();
                    });
                    $video[index].addEventListener('pause', function() {
                        $livePlayer[index].style.display = 'none';
                        $video[index].style.display = 'none';
                    });
                    $video[index].addEventListener('ended', function() {
                        $livePlayer[index].style.display = 'none';
                        $video[index].style.display = 'none';
                    });
                }
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
            addWatch(id) {
                var url = this.HELPHOST + 'help_video/watch.do?id=' + id;
                this.$http.post(url).then(res => {
                    if (res.data.status !== '0') {
                        console.log('错误');
                    }
                });
            },
            loadData() {
                var url = this.HELPHOST + 'help_video/list.do?searchKey=' + this.searchKey +
                    '&pageNum=' + this.curPage + '&pageSize=10';

                if (this.curPage > 1 && this.data.length % 2 === 0) {
                    this.isRequest = true;
                }
                this.$http.post(url).then(res => {
                    this.isRequest = false;
                    var data = res.data.data.page.list;

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
            this.addEvent();
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";
    .search {
        top: 0 !important;
    }
    .liveplayer {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #000;
        display: none;
    }
    video {
        display: none;
        height: 100%;
        width: 100%;
    }
    .btn {
        border-radius: 10px;
        background-color: #ce3249;
        width: 100px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: #fff;
    }
    .tabItem {
        top: 1rem;
        z-index: 9999 !important;
    }
    .helpvideo {
        height: 100%;
        .tabCon {
            padding: 1.1rem .28rem .28rem .12rem;
            padding-top: 2rem;
            .card {
                width: 45%;
                height: 3.4rem;
                margin-left: 2.4%;
                margin-bottom: .16rem;
                border: 1px solid #e0e0e0;
                border-radius: .1rem;
                overflow: hidden;
                .card-top {
                    position: relative;
                    width: 100%;
                    height: 1.92rem;
                    overflow: hidden;
                    .cover,.main-img,video {
                        position: absolute;
                        top:0;
                        left: 0;
                        width: 3.4rem;
                        background-size: cover;
                    }
                    .main-img {
                        top: 50%;
                        transform: translateY(-50%);
                        height: 100%;
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                    }
                    .cover{
                        height: 100%;
                        z-index: 999;
                    }
                    .view {
                        position: absolute;
                        z-index: 1000;
                        bottom: .16rem;
                        right: .06rem;
                        font-size: .22rem;
                        img {
                            width: .3rem;
                            margin-right: .06rem;
                        }
                        span {
                            display: inline-block;
                            width: .6rem;
                        }
                    }
                }
                .bottom {
                    position: relative;
                    padding: .16rem .2rem .2rem;
                    height: 1.48rem;
                    .cate {
                        position: absolute;
                        left: .2rem;
                        bottom: .2rem;
                        color: @text-color3;
                        font-size: @sub-title-fsize;
                    }
                }
            }
        }
    }
</style>
