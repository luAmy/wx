<template>
    <div :style="{width: width / num + 'px', display: 'inline-block'}">
        <canvas :id="'myCanvas'+index" :width="width/num" :height="height">不支持canvas</canvas>
    </div>
</template>

<script>
    export default {
        props: ['height', 'per', 'x', 'y', 'radius', 'backColor', 'proColor', 'fontColor', 'final', 'text', 'money', 'index', 'num'],
        data() {
            return {
                bfb: 0
            };
        },
        computed: {
            width() {
                var per = this.per || 1;
                return document.documentElement.clientWidth * per;
            }
        },
        methods: {
            // x,y 坐标,radius 半径,process 百分比,backColor 中心颜色, proColor 进度颜色, fontColor 中心文字颜色
            DrowProcess(x, y, radius, process, backColor, proColor, fontColor) {
                var canvas = document.getElementById('myCanvas' + this.index);

                if (canvas.getContext) {
                    var cts = canvas.getContext('2d');
                } else {
                    return;
                }
                if (window.devicePixelRatio) {
                    canvas.style.width = this.width + 'px';
                    canvas.style.height = this.height + 'px';
                    canvas.height = this.height * window.devicePixelRatio;
                    canvas.width = this.width * window.devicePixelRatio;
                    cts.scale(window.devicePixelRatio, window.devicePixelRatio);
                }
                cts.beginPath();
                // 坐标移动到圆心
                cts.moveTo(x, y);
                // 画圆,圆心是24,24,半径24,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针
                cts.arc(x, y, radius, 0, Math.PI * 2, false);
                cts.closePath();
                // 填充颜色
                cts.fillStyle = backColor;
                cts.fill();

                cts.beginPath();
                // 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形
                cts.moveTo(x, y);
                // 跟上面的圆唯一的区别在这里,不画满圆,画个扇形
                cts.arc(x, y, radius, Math.PI * 1.5, Math.PI * 1.5 - Math.PI * 2 * process / 100, true);
                cts.closePath();
                cts.fillStyle = proColor;
                cts.fill();

                // 填充背景白色
                cts.beginPath();
                cts.moveTo(x, y);
                cts.arc(x, y, radius - (radius * 0.15), 0, Math.PI * 2, true);
                cts.closePath();
                cts.fillStyle = 'rgba(255,255,255,1)';
                cts.fill();

                // 画一条线
                cts.beginPath();
//                cts.arc(x, y, radius - (radius * 0.30), 0, Math.PI * 2, true);
                cts.closePath();
                // 与画实心圆的区别,fill是填充,stroke是画线
//                cts.strokeStyle = backColor;
//                cts.stroke();

                // 在中间写字
                cts.font = '12px Arial';
                cts.textAlign = 'center';
                cts.textBaseline = 'middle';
                cts.moveTo(x, y);

                cts.fillStyle = '#333';
                cts.fillText(this.text, x, parseInt(y) - 10);
                cts.fillStyle = fontColor;
//                cts.fillText('剩余' + this.money + '元', x, parseInt(y) + 10);
//                cts.fillText(process + '%', x, parseInt(y) + 10);
            },
            Start(x, y, radius, process, backColor, proColor, fontColor, final) {
                this.DrowProcess(this.x, this.y, this.radius, this.bfb, this.backColor, this.proColor, this.fontColor);

                var t = setTimeout(this.Start, 5);
                if (this.bfb >= this.final) {
                    clearTimeout(t);
                    this.bfb = 0;
                    return;
                }
                this.bfb++;
            }
        },
        mounted() {
            this.Start(this.x, this.y, this.radius, this.bfb, this.backColor, this.proColor, this.fontColor, this.final);
        }
    };
</script>

<style lang="less" scoped>

</style>
