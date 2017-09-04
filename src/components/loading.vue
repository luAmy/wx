<template>
    <div>
        <transition>
            <!--<div v-show="isRequest" class="loading end">-->
                <!--<div class="mint-spinner-snake"-->
                     <!--style="border-top-color: rgb(204, 204, 204);-->
                     <!--border-left-color: rgb(204, 204, 204); border-bottom-color: rgb(204, 204, 204);-->
                     <!--height: .45rem; width: .45rem;"></div>-->
                <!--正在加载中-->
            <!--</div>-->
        </transition>
        <div v-show="showEnd" v-html="msg" class="end animated shake"></div>
    </div>
</template>
<script>
    export default {
        props: {
            isRequest: {
                type: Boolean,
                default () {
                    return false;
                }
            },
            showEnd: {
                type: Boolean,
                default () {
                    return false;
                }
            },
            msg: {
                type: String,
                default () {
                    return '没有更多数据了...';
                }
            }
        }
    };
</script>
<style lang="less" scoped>
    @import "../css/common.less";

    .end {
        height: .36rem;
        font-size: .28rem;
        color: #999;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: .2rem;
        animation-duration: 2s;
    }
    .mint-spinner-snake {
        border: .05rem solid transparent;
        margin-right: .1rem;
    }
</style>
