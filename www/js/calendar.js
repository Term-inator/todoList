var now = new Date();
var previews = now; //上一次的使用时间
var one_day = 24*60*60*1000;
var tommorow = new Date(now.getTime() + one_day);
var after_tommorrow = new Date(tommorow.getTime() + one_day);

var time = {
    year: now.getFullYear(),
    month: now.getMonth()+1,
    date: now.getDate(),
}

var time_required = deepClone(time);
var offset = 0; //和当前月的偏移
$('.pre').click(() => {
    if(offset <= 0) {
        alert("到底了！");
    }else {
        --offset;
        --time_required.month;
        if(time_required.month <= 0) {
            time_required.month = 12;
            --time_required.year;
        }
        initCalendar();
    }
})

$('.next').click(() => {
    if(offset >= 12) {
        alert("只支持添加一年内的事件！");
    }else {
        ++offset;
        ++time_required.month;
        if(time_required.month > 12) {
            time_required.month = 1;
            ++time_required.year;
        }
        initCalendar();
    }
})

function initCalendar() {
    $('.day').empty();
    $('.info').html(time_required.year+"年"+time_required.month+"月");
    var last_day = getMonthDay(time_required.year, time_required.month);
    var rest = 7 - last_day.week_day; //月末空白的格子
    var line = "</ul>";
    var cnt = 7; //一行7格
    for(; rest > 0; --rest, --cnt) {
        line = "<li class='algin' style='opacity: 0'>-1</li>" + line;
    }
    
    for(var date = last_day.date; date > 0; --date, --cnt) {
        if(cnt == 0) {
            line = "<ul>" + line;
            $('.day').prepend(line);
            line = "</ul>";
            cnt = 7;
        }
        if(time_required.year == time.year && time_required.month == time.month && date == time.date) {
            line = "<li class='align today date'>"+ date +"</li>" + line;
        }else {
            line = "<li class='align date'>"+ date +"</li>" + line;
        }
    }

    for(; cnt > 0; --cnt) {
        line = "<li class='align' style='opacity: 0'>-1</li>" + line;
    }
    line = "<ul>" + line;
    $('.day').prepend(line);
}

var show; //选择了日期后是否在日历图标边显示
$('#calendar').on('click', '.date', (e) => {
    date_choosed.year = time_required.year;
    date_choosed.month = time_required.month;
    date_choosed.date = parseInt($(e.target).html());
    date_choosed.choosed = true;
    if(show) {
        var result = processTime(date_choosed.year, date_choosed.month ,date_choosed.date);
        $('.date-choosed').html(result.time_title);
    }
    hideCalendar();
})

function showCalendar() {
    initCalendar();
    $('#calendar').css('z-index',999);
    if(mouse_position.y < size.height/2) {
        $('#calendar').css('left', mouse_position.x);
        $('#calendar').css('top', mouse_position.y);
    }else {
        $('#calendar').css('left', mouse_position.x);
        $('#calendar').css('top', mouse_position.y-$('#calendar').innerHeight());
    }

    $(document).click((e) => {
        if($(e.target).id != 'calendar' && $(e.target).parents('.calendar-button-wrapper').length == 0 && $(e.target).parents('#calendar').length == 0) {
            hideCalendar();
            if(!date_choosed.choosed) {
                initDateChoosed();
            }
            date_choosed.choosed = false;
            $(document).unbind('click');
        }
    })
}

function hideCalendar() {
    time_required = deepClone(time);
    offset = 0; //清空之前翻日历的偏移量
    $('#calendar').css('z-index',-999);
}

$('.calendar-button-wrapper').click(() => {
    show = true;
    showCalendar();
})