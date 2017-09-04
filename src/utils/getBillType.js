export function getBillType(value) {
    var arr = ['J', 'H', 'FS', 'FB', 'CS', 'CB201',
        'DS', 'NB', 'SX', 'NP', 'HT', 'TZ', 'BC', 'JS', 'CP'];
    var type = ['借款单', '还款单', '费用申请单', '费用报销单', '出差申请单', '出差报销单', '电脑申请单',
        '电脑报销单', '事项申请单', '无合同付款单', '合同', '调整合同', '补充合同', '合同结算', '合同付款单'];
    for (var i = 0; i < arr.length; i++) {
        if (value.indexOf(arr[i]) !== -1) {
            return type[i];
        }
    }
};
