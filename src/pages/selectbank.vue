<template>
    <div class="selectbank">
        <search @search="search"></search>
        <div class="block">
            <div class="list" v-for="(item, index) in data"
                 @click="select(item.bankTypeId)">
                {{item.bankName}}
            </div>
        </div>
    </div>
</template>

<script>
    import search from '../components/search.vue';

    export default {
        components: {
            search
        },
        data() {
            return {
                data: []
            };
        },
        methods: {
            getBank() {
                var url = this.HOST + '?method=getBankNames&sessionID=' + this.SESSIONID;

                this.$http.post(url).then(res => {
                    this.data = res.data.t;
                    window.localStorage.setItem('allbanks', JSON.stringify(this.data));
                });
            },
            select(bankTypeId) {
                this.$router.replace('/selectbranch?bankTypeId=' + bankTypeId);
            },
            search(value) {
                var arr = [];
                var allbanks = window.localStorage.getItem('allbanks');
                var data = {};
                if (allbanks && allbanks !== 'undefined') {
                    data = JSON.parse(allbanks);
                } else {
                    data = this.data;
                }
                if (value.length > 0) {
                    for (var i in data) {
                        if (data[i].bankName.indexOf(value) !== -1) {
                            arr.push(data[i]);
                        }
                    }
                    this.data = arr;
                } else {
                    this.data = data;
                }
            }
        },
        created() {
            this.getBank();
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";
    .block {
        padding-top: 1rem;
    }
</style>
