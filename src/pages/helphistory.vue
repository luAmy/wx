<template>
    <div class="help-history">
        <search @search="search"></search>
        <div class="block" ref="scrollContent">
            <a class="card" v-for="(item, index) in list" :key="index" :href="item.wxUrl">
                <div class="main-img" :style="{'background-image': 'url('+ item.coverUrl +')'}"></div>
                <p class="title ell-2">{{item.title}}</p>
                <p class="date">{{item.created | DateFormat}}</p>
            </a>
            <v-loading :isRequest="isRequest" :showEnd="showEnd" :msg="'没有更多了'"></v-loading>
        </div>
    </div>
</template>

<script>
    import search from '../components/search.vue';
    import { scrollController } from '../utils/common';

    export default {
        components: {
            search,
            'v-loading': require('../components/loading.vue')
        },
        data() {
            return {
                exampleImg: require('../img/example.jpg'),
                list: [],
                searchKey: '',
                curPage: 1,
                showEnd: false,
                isRequest: false
            };
        },
        created() {
            this.loadData();
        },
        mounted() {
            var self = this;
            scrollController({
                ele: self.$refs.scrollContent,
                delay: 167,
                endCb () {
                    self.loadMore();
                }
            });
        },
        methods: {
            loadMore () {
                if (this.showEnd) return;
                if (!this.isRequest) {
                    this.curPage++;
                    this.loadData();
                }
            },
            loadData() {
                var url = this.HELPHOST + 'help_tips/list.do?pageNum=' + this.curPage + '&pageSize=5' +
                    '&searchKey=' + this.searchKey;

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
                        if (this.curPage === 1) this.list = [];
                        this.list = this.list.concat(data);
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
            search(keyword) {
                this.searchKey = keyword;
                this.loadData();
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";

    .search {
        top: 0 !important;
    }
    .help-history {
        height: 100%;
        .block {
            height: 100%;
            overflow-y: scroll;
            padding-top: 1rem;
        }
        .card {
            display: block;
            margin: .28rem;
            padding: .3rem .28rem;
            .main-img {
                width: 6.4rem;
                height: 3.59rem;
                margin-bottom: .36rem;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
            }
            .title {
                font-size: .36rem;
                margin-bottom: .24rem;
            }
            .date {
                font-size: @sub-title-fsize;
                color: @text-color3;
            }
        }
    }
</style>
