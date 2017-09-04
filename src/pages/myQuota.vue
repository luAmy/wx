<template>
    <div class="quota">
        <div class="sec clear">
            <span class="fl">{{year}}年额度</span>
            <span class="fr">下次释放日期：{{month + 2}}月1日</span>
        </div>
        <div class="card">
            <!--:class="{two: data.length === 2, three: data.length === 3}"-->
            <div class="dec" v-if="showChart">
                <span class="num">{{decAvailable}}</span>
                <!--<span class="num">10000.00</span>-->
            </div>
            <radial-progress v-if="showChart" :height="3.2 * rem" :x="3.7 * rem" :y="1.68 * rem"
                             :radius="1.2 * rem" :backColor="'#eee'"
                             :proColor="'#38acff'" :fontColor="'#999'" :final="totalFinal"
                             :text="'可用额度'"
                             :money="decAvailable" :num="1">
            </radial-progress>
            <!--<radial-progress v-if="data.length === 1" v-for="(item, index) in data" :key="index" :height="3.2 * rem" :x="3.7 * rem" :y="1.68 * rem"-->
            <!--:radius="1 * rem" :backColor="'#eee'"-->
            <!--:proColor="'#38acff'" :fontColor="'#999'" :final="item.decAvailable / item.totoal * 100" :text="item.expenseName | quotaText"-->
            <!--:money="item.decAvailable" :index="index" :num="data.length">-->
            <!--</radial-progress>-->
            <!--<radial-progress v-if="data.length === 2" v-for="(item, index) in data" :key="index" :per="0.8" :height="3.2 * rem" :x="1.88 * rem" :y="1.68 * rem"-->
            <!--:radius="1 * rem" :backColor="'#eee'"-->
            <!--:proColor="'#38acff'" :fontColor="'#999'" :final="item.decAvailable / item.totoal * 100" :text="item.expenseName | quotaText"-->
            <!--:money="item.decAvailable" :index="index" :num="data.length">-->
            <!--</radial-progress>-->
            <!--<radial-progress v-if="data.length === 3" v-for="(item, index) in data" :key="index" :per="0.9" :height="3.2 * rem" :x="1.3 * rem" :y="1.68 * rem"-->
            <!--:radius="1 * rem" :backColor="'#eee'"-->
            <!--:proColor="'#38acff'" :fontColor="'#999'" :final="item.decAvailable / item.totoal * 100" :text="item.expenseName | quotaText"-->
            <!--:money="item.decAvailable" :index="index" :num="data.length">-->
            <!--</radial-progress>-->
            <!--<radial-progress v-if="data.length === 4" v-for="(item, index) in data" :key="index" :height="2.6 * rem" :x="0.92 * rem" :y="1.36 * rem"-->
            <!--:radius="0.85 * rem" :backColor="'#eee'"-->
            <!--:proColor="'#38acff'" :fontColor="'#999'" :final="item.decAvailable / item.totoal * 100" :text="item.expenseName | quotaText"-->
            <!--:money="item.decAvailable" :index="index" :num="data.length">-->
            <!--</radial-progress>-->
        </div>
        <div class="sec">额度使用详情</div>
        <div class="card bar-card" v-for="(item, index) in data" :key="index">
            <div class="title">{{item.expenseName | quotaText}}</div>
            <div class="bar">
                <div class="bar-bg"></div>
                <div class="bar-front"></div>
            </div>
            <div class="addition clear">
                <div class="text fl">
                    剩<span class="num">{{item.decAvailable}}</span>元，可用共{{item.totoal}}元
                </div>
                <!--<router-link class="detail fr" :to="'/quotadetail'">-->
                    <!--查看明细 <img :src="arrow" alt="arrow">-->
                <!--</router-link>-->
            </div>
        </div>
    </div>
</template>

<script>
    import radialProgress from '../components/radialProgress.vue';

    export default {
        components: {
            radialProgress
        },
        data() {
            return {
                arrow: require('../img/arrow-blue.png'),
                data: [],
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                totalFinal: 0,
                decAvailable: 0,
                showChart: false
            };
        },
        computed: {
            rem() {
                return document.documentElement.clientWidth / 7.5;
            }
        },
        created() {
            var url = this.HOST + '?method=getBudgetDo&userNum=' + this.USERNUM + '&sessionID=' + this.SESSIONID;
            this.$http.post(url).then(res => {
                this.data = res.data.t;
            });
        },
        updated() {
            /* eslint-disable no-unused-vars */
            var bar = document.querySelectorAll('.bar-front');
            var self = this;
            var money = 0;
            var total = 0;

            setTimeout(function () {
                for (let i in self.data) {
                    bar[i].style.width = (self.data[i].decAvailable / self.data[i].totoal * 100) + '%';
                    money += parseInt(self.data[i].decAvailable);
                    total += parseInt(self.data[i].totoal);
                }
                self.decAvailable = money;
                self.totalFinal = money / total * 100;
                self.showChart = true;
            }, 100);
        }
    };
</script>

<style lang="less" scoped src="../css/quota.less"></style>
