<template>
    <div class="comment">
        <div class="card">
            <div class="title">亲，您的{{billNum}}报销单共享审批已完成，请对这次审批过程给予评价，谢谢~！</div>
            <ul class="emojis box">
                <li class="rank box-f1" v-for="(item, index) in rank" @click="selectRank(index)">
                    <img :src="require('../img/'+ item.img +'-act.png')" v-if="index === activeIndex" :alt="item.img"
                         class="icon">
                    <img :src="require('../img/'+ item.img +'.png')" v-else :alt="item.img" class="icon">
                    <p class="text" :class="{active: index === activeIndex}">{{item.text}}</p>
                </li>
            </ul>
        </div>
        <div class="list clear" v-if="activeIndex === 0">
            <div class="text fl">不满意原因：</div>
            <div class="value fl" :class="{warn: activeIndex === 0 || activeIndex === 1}">
                <picker v-if="arr" :data="pickerArr" :choose="unsatisfy" :chooseId="unsatisfyId"
                        :pickName="'name'" :pickIdName="'number'"ref="picker"
                        @confirm="confirm">
                </picker>
            </div>
            <img :src="arrowDown" class="arrow-down fr" alt="arrowDown">
        </div>
        <textarea id="comment" placeholder="请填写评价内容" v-model="comment" @click="changeHeight($event)"></textarea>
        <div class="btn" :class="{disabled: (activeIndex === 0) && (comment.length === 0 || !unsatisfyId)}"
        @click="submit">提交评价</div>
    </div>
</template>

<script>
    import Picker from '../components/picker.vue';
    import { Toast } from 'mint-ui';

    export default {
        components: {
            Picker
        },
        data() {
            return {
                arrowDown: require('../img/arrow-down.png'),
                activeIndex: 3,
                comment: '',
                rank: [
                    {
                        img: 'notsatisfied',
                        text: '不满',
                        result: 3
                    },
                    {
                        img: 'average',
                        text: '一般',
                        result: 2
                    },
                    {
                        img: 'satisfied',
                        text: '满意',
                        result: 1
                    },
                    {
                        img: 'recommend',
                        text: '非常满意',
                        result: 0
                    }
                ],
                arr: [],
                unsatisfy: '',
                unsatisfyId: '',
                pickerArr: [],
                billNum: this.$route.query.billNum
            };
        },
        methods: {
            changeHeight(e) {
                var ele = document.getElementById('comment');
                setTimeout(() => { ele.scrollIntoViewIfNeeded(); }, 500);
            },
            loadData() {
                var url = this.HOST + '?method=getUnSatisfactionReasons&sessionID=' + this.SESSIONID;
                this.$http.post(url).then(res => {
                    var arr = [{'name': '请选择', 'number': null}];
                    this.pickerArr = arr.concat(res.data.t);
                });
            },
            selectRank(index) {
                this.activeIndex = index;
            },
            confirm(id, name) {
                this.unsatisfy = name;
                this.unsatisfyId = id;
            },
            submit() {
                var chooseType = {
                    'FB': 'ER_BizAccountBill',
                    'CB201': 'ER_TravelAccountBill',
                    'NB': 'Cpt_BizAccountBill',
                    'CP': 'Con_PayBill',
                    'NP': 'NonCon_PayBill'
                };
                var type = this.$route.query.type;
                var evaluateResult = this.rank[this.activeIndex].result;
                var billType = chooseType[type];

                var url = this.HOST + '?method=insertSatisfaction&userNum=' + this.USERNUM + '' +
                    '&billType=' + billType + '&billNum=' + this.billNum +
                    '&evaluateResult=' + evaluateResult + '&evaluateContent=' + this.comment + '&reasonNum=' + this.unsatisfyId +
                    '&sessionID=' + this.SESSIONID;

                this.$http.post(url).then(res => {
                    Toast({message: '评价成功', duration: 2000});
                    setTimeout(() => {
                        this.$router.replace('/mybaoxiao?index=5');
                        window.history.go(-1);
                    }, 2000);
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

    .comment {
        height: 100%;
        overflow: hidden;
        .card {
            padding: .28rem;
            border-bottom: 1px solid #e0e0e0;
            .title {
                margin-bottom: .43rem;
            }
            .emojis {
                padding: 0 1.2rem;
                margin-bottom: .15rem;
                text-align: center;
                font-size: @sub-title-fsize;
                color: @text-color3;
                img {
                    width: .8rem;
                    margin-bottom: .2rem;
                }
                .text {
                    &.active {
                        color: @text-color1;
                    }
                }
            }
        }
        .list {
            display: block;
            .text {
                color: @text-color3;
            }
            .value {
                &.warn {
                    color: @warn-color;
                }
            }
            img {
                width: .3rem;
                height: .15rem;
                margin-top: .1rem;
            }
        }
        textarea {
            width: 100%;
            height: 2.5rem;
            padding: .28rem;
        }
    }
</style>
