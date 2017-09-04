<template>
    <div class="selectbaoxiao">
        <search @search="search"></search>
        <table class="table-head">
            <tr class="thead">
                <th width="38%">用户名</th>
                <th width="31%">姓名</th>
                <th>所在部门</th>
            </tr>
        </table>
        <table class="table-body">
            <tr v-for="(item, index) in data" class="table-list" @click="choose(item.userNumber)"
            v-if="!ifChinese(item.userNumber)">
                <td>{{item.userNumber}}</td>
                <td>{{item.userName}}</td>
                <td>{{item.depName | getDepartment}}</td>
            </tr>
        </table>
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
            choose(agencyPersonNum) {
                var url = this.HOST + '?method=updateAgencyExpense&agencyExpense={"userNum":"' + this.USERNUM + '",' +
                    '"agencyPersons":[{"agencyPersonNum":"' + agencyPersonNum + '"}]}&sessionID=' + this.SESSIONID; // + this.USERNUM;
                this.$http.post(url).then(res => {
                    this.$router.replace('/thirdbaoxiao');
                    window.history.go(-1);
                });
            },
            search(value) {
                var arr = [];
                var selectbaoxiao = window.localStorage.getItem('selectbaoxiao');
                var data = {};
                if (selectbaoxiao && selectbaoxiao !== 'undefined') {
                    data = JSON.parse(selectbaoxiao);
                } else {
                    data = this.data;
                }
                if (value.length > 0) {
                    for (var i in data) {
                        if (data[i].userNumber.indexOf(value) !== -1 ||
                            data[i].depName.indexOf(value) !== -1 ||
                            data[i].userName.indexOf(value) !== -1) {
                            arr.push(data[i]);
                        }
                    }
                    this.data = arr;
                } else {
                    this.data = data;
                }
            },
            ifChinese(str) {
                var myReg = /.*[\u4e00-\u9fa5]+.*$/;
                if (myReg.test(str)) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        created() {
            var selectbaoxiao = window.localStorage.getItem('selectbaoxiao');
            if (selectbaoxiao && selectbaoxiao !== 'undefined') {
                this.data = JSON.parse(selectbaoxiao);
            } else {
                var url = this.HOST + '?method=getCsApplicant&companyNum=CWGX001&sessionID=' + this.SESSIONID;
                this.$http.post(url).then(res => {
                    this.data = res.data.t;
                    window.sessionStorage.setItem('selectbaoxiao', JSON.stringify(this.data));
                });
            }
        }
    };
</script>

<style lang="less" scoped src="../css/table.less"></style>
