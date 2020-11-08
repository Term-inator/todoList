
var date_choosed = {
    year: '',
    month: '',
    date: '',
    choosed: false //是否选择过
}

function initDateChoosed() {
    date_choosed = {
        year: '',
        month: '',
        date: '',
        choosed: false
    }
}

function add() { //为了让click和keypress共用
    var thing = $("#thing").val();
    if(thing != "") {
        for(var i = 0; i < thing.length; ++i) {
            if(thing[i] == '<' || thing[i] == '>') {
                alert('输入的内容不能包含"<"或">');
                return;
            }
        }

        var year = date_choosed.year;
        var month = date_choosed.month;
        var date = date_choosed.date

        if(data.things.find(item => item.thing == thing)) {
            alert('事件"'+thing+'"已存在！');
        }else {
            addThingsOnList(thing, year, month, date, cvs.width/2, cvs.height/2);
            addThingsOnGraph(thing, year, month, date, cvs.width/2, cvs.height/2);
            $("#thing").val("");
            reloadList("update");

            initDateChoosed();
            $('.date-choosed').html("无期限");
        }  
    }else {
        alert("事件不能为空！");
    }
}

$('#add').click(() => {
    add();
})

$(window).keypress((e) => {
    if(e.keyCode == 13 || e.which == 13) {
        add();
    }
})

$('.things').on('click', '.check',(e) => {
    var url = $(e.target).css("backgroundImage");
    var file = getFileName(url);
    if(file == "check") {
        $(e.target).css("backgroundImage","url('./img/check-active.png')");
        //删除
        var del = $(e.target).parent().prev().prev().html();
        data.things.find(item => item.thing == del).state = false;
    }else {
        $(e.target).css("backgroundImage","url('./img/check.png')");
        //取消删除
        var del_cancel = $(e.target).parent().prev().prev().html();
        data.things.find(item => item.thing == del_cancel).state = true;
    }
})

$('.things').on('click', '#ddl',() => { //按ddl排序
    if($('#ddl').hasClass("head-active")) {
        $('#ddl').removeClass(".head-active");
        data.ddl_sorted = false;
    }else {
        $('#ddl').addClass("head-active");
        data.ddl_sorted = true;
    }
    reloadList("sort");
})

$('.things').on('dblclick', '.thing',(e) => {
    if($(e.target).hasClass('head')) {
        return;
    }
    var pre_content = $(e.target).html(); //原先的内容

    $(e.target).html("<input class='modified-by-input' style='width: 100%'>");
    $('.modified-by-input').val(pre_content);
    $('.modified-by-input').select();

    $('.modified-by-input').blur((child) => {
        var now_content = $(child.target).val(); //后来键入的内容

        if(now_content != '' && now_content != pre_content) {
            if(data.things.find(item => item.thing == now_content)) {
                alert('事件"'+now_content+'"已存在！');
            }else {
                data.things.find(item => item.thing == pre_content).thing = now_content;
                reloadList("modify");
                reloadGraph(); //事件名改变，需要重加载象限
            }
        }else {
            $(e.target).html(pre_content);
        }
        
    })
});

$('.things').on('dblclick', '.ddl',(e) => {
    var pre_show = $(e.target).html(); //原先展示的内容，如：今天
    var pre_content = $(e.target).attr("title"); //原先的内容
    
    var pre_year = pre_content.substr(0, 4)
    var pre_month = pre_content.substring(5, pre_content.indexOf("月"));
    var pre_date = pre_content.substring(pre_content.indexOf("月")+1, pre_content.length-1);

    if(pre_content == "无期限") {
        pre_month = '';
        pre_date = '';
    }
    
    show = false;
    showCalendar();

    $('#calendar').on('click', '.date', () => {
        var now_year = date_choosed.year;
        var now_month = date_choosed.month;
        var now_date = date_choosed.date;
        date_choosed.choosed = true;

        if(now_year == pre_year && now_month == pre_month && now_date == pre_date) {
            $(e.target).html(pre_show);
        }else {
            var thing = $(e.target).prev().html();
            console.log(thing);
            data.things.find(item => item.thing == thing).ddl = {year: now_year, month:now_month, date: now_date};
            reloadList("modify");
        }

        hideCalendar();
        //若不解绑，则若先将a、b事件修改到12月1日，再修改a到12月2日，b也会被修改到12月2日
        //经过测试，发现第二次修改a的ddl时，第一次修改b时绑定的click事件似乎还在运行
        //不是很优雅，但目前实在是没办法了。。
        $('#calendar').unbind('click');

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
    })

    
});

function processTime(year, month, date) { //时间格式化
    var time_format = month + "月" + date + "日"; //显示在界面上的ddl格式
    var time_title = year + "年" + time_format; //鼠标悬浮显示的内容
    var time_class = ""; //ddl过期显示红色
    if(year != time.year) {
        time_format = year + "年" + time_format;
        time_title = time_format;
    }
    if(month == '') { //月份为空
        if(date == '') { //表示无ddl事件
            time_format = "无期限";
            time_title = time_format;
        }else { //表示每月都要做的事件
            time_format = "每月" + date + "日";
            time_title = year + "年" + time_format;
        }
    }
    else if(date == '') { //只剩month不为空的情况，表示持续在当前月的事件
        time_format = month + "月";
        time_title = year + "年" + time_format;
    }
    else if(year == time.year && month == time.month && date == time.date) {
        time_format = "今天";
    }
    else if(year == time.year && month == (tommorow.getMonth()+1) && date == tommorow.getDate()) {
        time_format = "明天";
    }
    else if(year == time.year && month == (after_tommorrow.getMonth()+1) && date == after_tommorrow.getDate()) {
        time_format = "后天";
    }
    else if(year == time.year && (month < time.month || (month == time.month && date < time.date))) {
        time_format = "已过期";
        time_class = "expire";
    }
    return {
        time_format, time_title, time_class
    }
}

function addThingsOnList(thing, year, month ,date, state, x, y) { //在List上添加
    var result = processTime(year, month ,date);
    var time_format = result.time_format;
    var time_title = result.time_title;
    var time_class = result.time_class;

    var li_thing = "<li class='thing'>"+thing+"</li>";
    var li_ddl = "<li class='ddl "+time_class+"' title='"+time_title+"'>"+time_format+"</li>";
    var li_check = "<li class='state'><div class='check'></div></li>";
    $('.things').append("<div>" + li_thing + li_ddl + li_check +"</div>");
    if(state == false) {
        $('.things').children('div :last-child').children('.state').children('.check').css("backgroundImage","url('./img/check-active.png')");
    }
}

function clearList() {
    $(".things").empty();
}