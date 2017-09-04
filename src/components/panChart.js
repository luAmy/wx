/**
 * Created by luqing on 2017/7/11.
 */
export function panChart() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var cWidth = canvas.width;
    var cHeight = canvas.height;
    var score = canvas.attributes['data-score'].value;
//  var stage = ['较差', '中等', '良好', '优秀', '极好'];
    var radius = 150;
    var deg0 = Math.PI / 9;
    var deg1 = Math.PI * 11 / 45;
    // var dot = new Dot();
    var dotSpeed = 0.03;
    // var pointer = new Pointer();
//  var textSpeed = Math.round(dotSpeed * 100 / deg1);
    var angle = 0;
    var credit = canvas.attributes['data-name'].value;
    var time = canvas.attributes['data-time'].value;
    var rank = canvas.attributes['data-rank'].value;

    drawFrame();
    // var a = setInterval(drawFrame, 8);

    function drawFrame () {
        if (window.devicePixelRatio) {
            canvas.style.width = '400px';
            canvas.style.height = '300px';
            canvas.height = 300 * window.devicePixelRatio;
            canvas.width = 400 * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
        ctx.save();
        ctx.clearRect(0, 0, cWidth, cHeight);
        ctx.translate(cWidth / 2, cHeight / 2);
        ctx.scale(0.62, 0.62);
        ctx.rotate(8 * deg0);

        // dot.x = radius * Math.cos(angle);
        // dot.y = radius * Math.sin(angle);
        // pointer.x = dot.x;
        // pointer.y = dot.y;

        var aim = (score - 400) * deg1 / 100;
        if (angle < aim) {
            angle += dotSpeed;
        } else {
            // clearInterval(a);
        }
        // dot.draw(ctx);
        // pointer.draw(ctx);

        text(credit);

        // 动画过的轨道线
        // ctx.save();
        // ctx.beginPath();
        // ctx.lineWidth = 2;
        // ctx.strokeStyle = 'rgba(255, 255, 255, .5)';
        // ctx.arc(0, 0, radius, 0, angle, false);
        // ctx.stroke();
        // ctx.restore();

        ctx.save(); // 刻度线

        for (var i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
            ctx.moveTo(145, 0);
            ctx.lineTo(130, 0);
            ctx.stroke();
            ctx.rotate(deg1);
        }
        ctx.restore();

        ctx.save(); // 细分刻度线
        for (i = 0; i < 100; i++) { // 25
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(255, 255, 255, .9)';
            ctx.moveTo(142, 0);
            ctx.lineTo(130, 0);
            ctx.stroke();
            ctx.rotate(deg1 / 20); // 5
        }
        ctx.restore();

        ctx.save(); // 信用阶段及评估时间文字
        ctx.rotate(10 * deg0);
        ctx.fillStyle = '#fff';
        ctx.font = '18px Microsoft yahei';
        ctx.textAlign = 'center';
        // if (score < 500) {
        //   ctx.fillText('信用较差', 0 , 40);
        // } else if (score < 600 && score >= 500) {
        //   ctx.fillText('信用中等', 0 , 40);
        // } else if (score < 700 && score >= 600) {
        //   ctx.fillText('信用良好', 0 , 40);
        // } else if (score < 800 && score >= 700) {
        //   ctx.fillText('信用优秀', 0 , 40);
        // } else if (score <= 900 && score >= 800) {
        //   ctx.fillText('信用极好', 0 , 40);
        // }
        ctx.fillText('评估时间：' + time + '', 0, 14);
        ctx.fillStyle = '#fff';
        // ctx.font = '14px Microsoft yahei';
        ctx.fillText(rank, 0, -70);

        ctx.restore();

        // ctx.save(); //最外层轨道
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, .4)';
        ctx.lineWidth = 2;
        ctx.arc(0, 0, radius, 0, 11 * deg0, false);
        ctx.stroke();
        ctx.restore();
    }
};

// function Dot () {
//     this.x = 0;
//     this.y = 0;
//     this.draw = function (ctx) {
//         ctx.save();
//         ctx.beginPath();
//         ctx.fillStyle = 'rgba(255, 255, 255, 1)';
//         ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
//         ctx.fill();
//         ctx.restore();
//     };
// }
//
// function Pointer() {
//     // var img = document.getElementById('pointer');
//
//     this.x = 130;
//     this.y = -50;
//     this.draw = function (ctx) {
//         ctx.save();
//         // ctx.drawImage(img, this.x, this.y - 50);
//         ctx.restore();
//     };
// }

function text (process) {
    var canvas = document.getElementById('canvas');
    if (!canvas) {
        return;
    }
    var ctx = canvas.getContext('2d');
    var deg0 = Math.PI / 9;
    ctx.save();
    ctx.rotate(10 * deg0);
    ctx.fillStyle = '#fff';
    ctx.font = '40px Microsoft yahei';
    ctx.textAlign = 'center';
    ctx.textBaseLine = 'top';
    ctx.fillText(process, 0, -20); // 分数
    ctx.restore();
}

