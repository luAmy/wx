<template>
    <div class="my-picker">
        <div class="opener" @click="show()">{{confirm}}</div>
        <picker :slots="slots" @change="onValuesChange" :value-key="'name'" :show-toolbar="showToolbar">
            <span style="float:left" @click="cancel">取消</span> <span style="float:right" @click="submit">确定</span>
        </picker>
    </div>
</template>

<script>
    import { Picker } from 'mint-ui';

    export default {
        components: {
            Picker
        },
        props: ['data', 'type', 'choose', 'chooseId', 'pickName', 'pickIdName'],
        data() {
            return {
                showToolbar: true,
                confirm: '',
                confirmId: ''
            };
        },
        computed: {
            slots() {
                return [{
                    flex: 1,
                    values: this.data,
                    className: 'slot1',
                    textAlign: 'center',
                    defaultIndex: 0
                }];
            }
        },
        created() {
            this.confirm = this.choose;
            this.confirmId = this.chooseId;
            console.log(this.confirm);
        },
        methods: {
            show() {
                document.querySelector('.picker').style.bottom = 0;
            },
            onValuesChange(picker, values) {
                // 请选择时是否需要显示原数据？
                var value = this.pickId;
                if (this.choose) {
                    this.confirm = this.choose;
                    return;
                }

                this.confirm = values[0].name;
                this.confirmId = values[0][value];
//                this.$emit('onValuesChange', values[0], this.type);
            },
            close() {
                document.querySelector('.picker').style.bottom = '-5rem';
            },
            cancel() {
                if (this.type) {
                    this.$emit('cancel', this.type);
                }
                this.confirm = this.choose || '请选择';
                this.close();
            },
            submit() {
//                this[type] = this[type + 'Choose'];
//                this[type + 'Id'] = this[type + 'ChooseId'];
//                this[type + 'Confirm'] = true;
                if (this.type) {
                    this.$emit('confirm', this.type);
                }
                this.$emit('confirm', this.confirmId, this.confirm);
                this.close();
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";

    .opener {
        text-align: right;
    }
</style>
