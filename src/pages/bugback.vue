<template>
    <div>
        <div class="content">
            <textarea id="content" placeholder="请输入打回原因" v-model="content" maxlength="140"></textarea>
            <span class="counter">{{content.length}}/140</span>
        </div>
        <div class="btn" :class="{disabled: content.length==0}" @click="submit">确定</div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';

    export default {
        data() {
            return {
                content: ''
            };
        },
        methods: {
            submit() {
                var eid = this.$route.query.eid;
                var url = this.BZHOST + '/operation/common/Common-mBack?eid=' + eid + '&reason=' + this.content; // + this.USERNUM;
                this.$http.post(url).then(res => {
                    console.log(res.data);
                    if (res.data.code === 200) {
                        Toast({message: '打回成功', duration: 2000});
                        setTimeout(() => {
                            this.$router.replace('/bughistory');
                            window.history.go(-1);
                        }, 2000);
                    } else {
                        Toast({message: res.data.msg, duration: 2000});
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";

    .content {
        position: relative;
        padding-top: .2rem;
        textarea {
            width: 100%;
            height: 2.5rem;
            padding: .28rem;
            box-sizing: border-box;
        }
        .counter {
            position: absolute;
            right: .28rem;
            bottom: .28rem;
            color: @text-color3;
            font-size: @sub-title-fsize;
        }
    }
</style>
