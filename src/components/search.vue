<template>
    <div class="search">
        <div class="search-panel">
            <div class="search-main">
                <input type="text" id="search" v-model="keyword" @focus="focus(true)" @blur="focus(false)">
                <div class="placeholder" v-show="isFocus">
                    <img :src="search" alt="search">搜索
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                search: require('../img/input.png'),
                isFocus: true,
                keyword: ''
            };
        },
        methods: {
            focus(flag) {
                if (flag) {
                    this.isFocus = false;
                } else {
                    if (!this.keyword) {
                        this.isFocus = true;
                    }
                }
            }
        },
        watch: {
            keyword() {
                this.$emit('search', this.keyword.trim());
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";

    .search {
        position: fixed;
        top: 0;// .86rem;
        left: 0;
        width: 100%;
        z-index: 9999;
        .search-panel {
            width: 100%;
            height: 1rem;
            padding: .2rem .28rem;
            background-color: #dddde2;
            .search-main {
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: .1rem;
                background-color: #fff;
                input {
                    position: absolute;
                    z-index: 999;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    background-color: transparent;
                }
                .placeholder {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    line-height: .62rem;
                    text-align: center;
                    color: @text-color3;
                    background-color: transparent;
                    img {
                        width: .29rem;
                        margin-top: -.04rem;
                        margin-right: .14rem;
                    }
                }
            }
        }
    }
</style>
