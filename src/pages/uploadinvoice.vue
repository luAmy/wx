<template>
    <div class="uploadinvoice">
        <div class="card">
            <label for="upload">
                <img :src="uploadImg" alt="" class="uploadimg">
                <span class="text">上传图片</span>
                <input type="file" capture="camera" accept="image/*" id="upload" name="cameraInput"/>
            </label>
        </div>
        <div class="choose-list clear">
            请选择发票类型<img :src="arrowDown" alt="arrow" class="arrow-down fr">
            <span class="value fr">
                <picker :data="pickerArr" :type="pickType" :choose="typeChoose"
                        :chooseId="typeChooseId" ref="picker" @confirm="confirm">
                </picker>
            </span>
        </div>
        <div class="btn">确定</div>
    </div>
</template>

<script>
    import Picker from '../components/picker.vue';

    export default {
        components: {
            Picker
        },
        data() {
            return {
                uploadImg: require('../img/uploadimg.png'),
                arrowDown: require('../img/arrow-down.png'),
                type: '请选择',
                typeId: null,
                typeChoose: '请选择',
                typeChooseId: null,
                typeConfirm: '',
                pickerArr: '',
                pickType: ''
            };
        },
        methods: {
//            show() {
//                this.pickType = 'type';
//                this.$refs.picker.show();
//            },
//            onValuesChange(value, type) {
//                this.typeChoose = value.name;
//                this.typeChooseId = value.value;
//            },
//            cancel(type) {
//                if (!this.typeConfirm) {
//                    this.typeChoose = '请选择';
//                    this.typeChooseId = null;
//                    this.typeConfirm = false;
//                } else {
//                    // 使用上次confirm的值
//                    this.typeChoose = this.type;
//                    this.typeChooseId = this.typeId;
//                }
//            },
            confirm(type) {
            }
        },
        created() {
            var arr = [{'name': '请选择', 'value': null}];
            var arr1 = [{'name': '餐饮', 'value': 0}, {'name': '通讯', 'value': 1}, {
                'name': '交通',
                'value': 2
            }, {'name': '其他', 'value': 3}];
            this.pickerArr = arr.concat(arr1);

            this.typeId = 12;
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";

    .uploadinvoice {
        .card {
            margin-top: .2rem;
            height: 1.76rem;
            border-bottom: 1px solid #e0e0e0;
            overflow: hidden;
            label {
                img {
                    width: 1.2rem;
                    margin: .28rem;
                    margin-right: .2rem;
                }
                .text {
                    color: #999;
                }
                #upload {
                    visibility: hidden;
                    height: 0;
                }
            }
        }
        .choose-list {
            padding: 0 .28rem;
            height: 1rem;
            line-height: 1rem;
            background-color: #fff;
            .value {
                margin-right: .16rem;
            }
            img {
                width: .3rem;
                margin-top: .43rem;
            }
        }
    }
</style>
