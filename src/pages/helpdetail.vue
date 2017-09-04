<template>
    <div class="wrap">
        <div class="title">{{data.title}}</div>
        <div class="time" v-if="data.modified">{{data.modified | DateFormat}}</div>
        <div class="content" v-html="data.content"></div>
        <div class="footer">
            <span class="read">阅读数：{{data.watchCount + 1}}</span>
            <span class="follow">
                <img v-if="isFollowed(data.id)" :src="require('../img/heart.png')" class="src" @click="follow(data.id)">
                <img v-else :src="require('../img/heart-act.png')" class="src" @click="unFollow(data.id)">
                <span class="num">{{attentionCount}}</span>
            </span>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                data: {},
                attentionCount: 0,
                isFollow: window.localStorage.getItem('isFollow')
                    ? JSON.parse(window.localStorage.getItem('isFollow')) : false
            };
        },
        computed: {
        },
        methods: {
            loadData() {
                var id = this.$route.query.id;
                var url = this.HELPHOST + 'help_text/content.do?id=' + id;
                this.$http.post(url).then(res => {
                    this.data = res.data.data;
                    this.attentionCount = this.data.attentionCount;
                });
            },
            isFollowed(id) {
//                var followed = window.localStorage.getItem('followed');
//                if (followed) {
//                    followed
//                }
            },
            follow(id) {
                /* eslint-disable no-unused-vars */
                var url = this.HELPHOST + 'help_text/attention.do?id=' + id;
                var followed = window.localStorage.getItem('followed');
                var arr = [];
                if (followed) {
                    arr = JSON.parse(followed);
                }
                axios.post(url).then(res => {
                    if (res.data.msg === 'ok') {
                        this.attentionCount += 1;
                        this.isFollow = true;
                        arr.push(id);
                        window.localStorage.setItem('followed', followed);
                    }
                });
            },
            unFollow(id) {
                var url = this.HELPHOST + 'help_text/un_attention.do?id=' + id;
                axios.post(url).then(res => {
                    if (res.data.msg === 'ok') {
                        this.attentionCount -= 1;
                        this.isFollow = false;
                        window.localStorage.setItem('isFollow', false);
                    }
                });
            }
        },
        created() {
            this.loadData();
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";

    .wrap {
        padding: .28rem;
        position: relative;
        background-color: #fff;
        overflow-y: scroll;
        .title {
            font-size: .4rem;
            margin: .28rem 0;
        }
        .time {
            margin-bottom: .5rem;
            font-size: @sub-title-fsize;
            color: @text-color3;
        }
        .footer {
            margin-top: .5rem;
            font-size: @sub-title-fsize;
            color: @text-color3;
            img {
                width: .3rem;
                margin-left: .2rem;
            }
        }
    }
</style>
