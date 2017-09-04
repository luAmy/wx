export function scrollController (obj) {
    var ele = obj.ele;
    var distance = obj.distance ? obj.distance : 2;
    var lastScrollTop = 0;
    var timer;

    document.body.addEventListener('touchmove', function (e) {
        // e.preventDefault();
    }, false);

    // 判断是否为数组
    if (ele[0]) {
        for (let i = 0; i < ele.length; i++) {
            ele[i].addEventListener('touchmove', function (e) {
                e.stopPropagation();
            }, false);
            ele[i].addEventListener('scroll', function (e) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    var scrollTop = ele[i].scrollTop;
                    if (scrollTop - lastScrollTop > 0) {
                        if (obj.downCb) obj.downCb();
                        if (scrollTop + ele[i].offsetHeight + distance >= ele[i].scrollHeight) {
                            if (obj.endCb) obj.endCb();
                        }
                    } else {
                        if (obj.upCb) obj.upCb();
                    }
                    lastScrollTop = ele[i].scrollTop;
                }, obj.delay ? obj.delay : 0);
            }, false);
        }
    } else {
        ele.addEventListener('touchmove', function (e) {
            e.stopPropagation();
        }, false);
        ele.addEventListener('scroll', function (e) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                var scrollTop = ele.scrollTop;
                if (scrollTop - lastScrollTop > 0) {
                    if (obj.downCb) obj.downCb();
                    if (scrollTop + ele.offsetHeight + distance >= ele.scrollHeight) {
                        if (obj.endCb) obj.endCb();
                    }
                } else {
                    if (obj.upCb) obj.upCb();
                }
                lastScrollTop = ele.scrollTop;
            }, obj.delay ? obj.delay : 0);
        }, false);
    }
};
