<template>
    <div class="thirdbaoxiao">
        <div class="card" v-for="(item, index) in data">
            <div class="title-line">
                <img :src="sub" alt="sub" class="sub" @click="deleteAgent($event, item.fid)">
                <span class="title">{{item.userName}}</span>
            </div>
            <div class="code">
                用户名：{{item.userNum}}
            </div>
            <div class="department">
                所在部门：{{item.depName}}
            </div>
            <div class="history">
                是否允许查看历史借款:{{item.isAllowViewLoan === '0'? '否':'是'}}
                <!--<span class="check-false"></span>-->
            </div>
        </div>
        <router-link class="card" :to="'/selectbaoxiaoren'">
            <div class="title-line">
                <img :src="add" alt="add" class="add">
                <span class="title">新增代报销人</span>
            </div>
        </router-link>
        <div class="bottom-note">通过设置代报销，可以由代报销人代为发起费用申请、费用报销等操作.</div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';

    export default {
        components: {
            MessageBox
        },
        data() {
            return {
                add: require('../img/add.png'),
                sub: require('../img/sub.png'),
                data: ''
            };
        },
        created() {
            var url = this.HOST + '?method=getAgencyExpense&userNum=' + this.USERNUM + '&sessionID=' + this.SESSIONID;
            this.$http.post(url).then(res => {
                this.data = res.data.t;
            });
        },
        methods: {
            deleteAgent(e, fid) {
                MessageBox({
                    message: '确定要删除吗',
                    showCancelButton: true
                }).then(action => {
                    if (action === 'confirm') {
                        console.log(fid);

                        var url = this.HOST + '?method=deleteAgencyExpense&fid=' + fid + '&sessionID=' + this.SESSIONID; // + this.USERNUM;
                        this.$http.post(url).then(res => {
                            var x = e.target.parentNode.parentNode;
                            x.parentNode.removeChild(x);
                        });
                    }
                });
            }
        }
//        beforeRouteEnter (to, from, next) {
//            if (from.fullPath === '/selectbaoxiaoren') {
//            }
//            next();
//        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";

    .thirdbaoxiao {
        padding-top: .2rem;
        .card {
            display: block;
            padding: .28rem;
            border-bottom: 1px solid #e0e0e0;
            /*&:first-child {*/
                /*border-bottom: 1px solid #e0e0e0;*/
            /*}*/
           .title-line {
               line-height: .44rem;
               font-size: @card-title-fsize;
               color: @text-color1;
               margin-bottom: .13rem;
               padding-left: 0;
               img {
                   width: .44rem;
                   margin-top: -.02rem;
                   margin-right: .08rem;
               }
           }
            div {
                padding-left: .61rem;
                font-size: @sub-title-fsize;
                color: @text-color3;
                margin-bottom: .1rem;
                &:last-child {
                    margin-bottom: 0;
                }
                .check-false {
                    display: inline-block;
                    width: .22rem;
                    height: .22rem;
                    vertical-align: middle;
                    border: 1px solid #e0e0e0;
                }
            }
        }
    }
</style>
