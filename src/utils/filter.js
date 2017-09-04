import Vue from 'vue';

Vue.filter('quotaText', function(value) {
    return value.substring(value.indexOf('-') + 1, value.length);
});

Vue.filter('formatMoney', function(s, n) {
    if (!s && s !== 0) {
        return '';
    }
    if (s === '0') {
        return s;
    }
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + '';
    var l = s.split('.')[0].split('').reverse();
    var r = s.split('.')[1];
    var t = '';
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
    }
    return '¥' + t.split('').reverse().join('') + '.' + r;
});

Vue.filter('getDepartment', function(value) {
    var arr = value.split('_');
    return arr[arr.length - 1];
});

Vue.filter('addPercent', function(value) {
    if (value && !isNaN(value)) {
        return value + '%';
    }
});

Vue.filter('getBillType', function(value) {
    var arr = ['J201', 'H201', 'FS201', 'FB201', 'CS201', 'CB201',
        'DS201', 'NB201', 'SX201', 'NP201', 'HT201', 'TZ201', 'BC201', 'JS201', 'CP201'];
    var type = ['借款单', '还款单', '费用申请单', '费用报销单', '出差申请单', '出差报销单', '电脑申请单',
        '电脑报销单', '事项申请单', '无合同付款单', '合同', '调整合同', '补充合同', '合同结算', '合同付款单'];
    for (var i = 0; i > arr.length; i++) {
        if (value.indexOf(arr[i]) !== -1) {
            return type[i];
        }
    }
});

Vue.filter('DateFormat', function(jsonDate, sec) {
    try {
        var date = new Date(parseInt(jsonDate));
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        // var hours = date.getHours();
        // var minutes = date.getMinutes();
        // var seconds = date.getSeconds();
        // var milliseconds = date.getMilliseconds();
        return date.getFullYear() + '/' + month + '/' + day;
    } catch (ex) {
        return '';
    }
});

Vue.filter('DateFormatSec', function(value) {
    if (!value) {
        return '';
    }
    value = value.toString().length < 13 ? value * 1000 : value;
    var date = new Date(value);
    var month = date.getMonth() + 1;
    var Y = '';
    var M = '';
    var D = '';
    var H = date.getHours();
    var Mi = date.getMinutes();
    var S = date.getSeconds();

    Y = date.getFullYear() + '-';
    M = (month < 10 ? '0' + month : date.getMonth() + 1) + '-';
    D = date.getDate();
    D = D < 10 ? '0' + D : D;
    H = H < 10 ? '0' + H : H;
    Mi = Mi < 10 ? '0' + Mi : Mi;
    S = S < 10 ? '0' + S : S;
    return (Y + M + D + ' ' + H + ':' + Mi + ':' + S);
});

Vue.filter('removeBr', function(str) {
    return str.replace(/\r?\n/g, '<br/>').replace(/\s/g, '&nbsp;');
});

