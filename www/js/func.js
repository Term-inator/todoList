function getFileName(url) {
    var pos_l = url.lastIndexOf('/');
    var pos_r = url.lastIndexOf('.');
    return url.substring(pos_l+1,pos_r);
}

function getMonthDay(year, month) {
    var last_day = new Date(year, month-1+1, 0);
    return {
        date: last_day.getDate(),
        week_day: last_day.getDay()
    };
}

function isObject(value) {
    return value != null && (typeof value == 'object' || typeof value == 'function')
}

function deepClone(obj) {
    if (!isObject(obj)) {
        throw new Error('obj 不是一个对象！');
    }

    var isArray = Array.isArray(obj);
    var cloneObj = isArray ? [] : {}
    for (var key in obj) {
        cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key];
    }

    return cloneObj;
}

function activateReloadMonitor() {
    //每天0点到1点之间刷新
    setInterval(() => {
        now = new Date();
        if(now.getHours() == 0) {
            window.location.reload();
        }
    }, 3600000);

    //某次使用时间和上次使用时间（最小单位为天）不同则刷新
    window.onfocus = function() {
        now = new Date();
        if((previews.getFullYear() != now.getFullYear()) || (previews.getMonth() != now.getMonth()) || (previews.getDate() != now.getDate())) {
            window.location.reload();
        }
    }
}