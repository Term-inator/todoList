
function add() { //为了让click和keypress共用
    var thing = $("#thing").val();
    if(thing != "") {
        var year = time.year;
        var month = $('#month option:selected').val();
        var date = $('#date option:selected').val();
        if(month < time.month) { //选择的月份比当前的小就认为选择的是明年的月份
            ++year;
        }
        if(data.things.find(item => item.thing == thing)) {
            alert('事件"'+thing+'"已存在！');
        }else {
            addThingsOnList(thing, year, month, date, cvs.width/2, cvs.height/2);
            addThingsOnGraph(thing, year, month, date, cvs.width/2, cvs.height/2);
            $("#thing").val("");
            reloadList("update");
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
        var del = $(e.target).data("thing");
        data.things.find(item => item.thing == del).state = false;
    }else {
        $(e.target).css("backgroundImage","url('./img/check.png')");
        //取消删除
        var del_cancel = $(e.target).data("thing");
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
    var pre_month = pre_content.substring(0, pre_content.indexOf("月"));
    var pre_date = pre_content.substring(pre_content.indexOf("月")+1, pre_content.length-1);
    
    $(e.target).html("<input class='modified-by-input' style='width: 25%'>月<input class='modified-by-input' style='width: 25%'>日");
    $('.modified-by-input').eq(0).val(pre_month);
    $('.modified-by-input').eq(0).select();
    $('.modified-by-input').eq(1).val(pre_date);

    $('.modified-by-input').eq(0).blur(() => { //不太优雅，迟早换掉
        $('.modified-by-input').eq(1).select();
        $('.modified-by-input').eq(1).blur(() => {
            var now_month = $('.modified-by-input').eq(0).val(); //后来键入的内容
            var now_date = $('.modified-by-input').eq(1).val();
            if(now_month != '' && now_date != '' && (now_month != pre_month || now_date != pre_date)) {
                var existed_thing = data.things.find(item => (item.ddl.month == pre_month && item.ddl.date == pre_date));
                console.log(existed_thing)
                existed_thing.ddl.month = now_month;
                existed_thing.ddl.date = now_date;
                reloadList("modify");
            }else {
                $(e.target).html(pre_show);
            }
        });
    })
});

function processTime(year, month, date) { //时间格式化
    var time_format = month + "月" + date + "日"; //显示在界面上的ddl格式
    var time_title = time_format; //鼠标悬浮显示的内容
    var time_class = ""; //ddl过期显示红色
    if(month == '') { //月份为空
        if(date == '') { //表示无ddl事件
            time_format = "无期限";
            time_title = time_format;
        }else { //表示每月都要做的事件
            time_format = "每月" + date + "日";
            time_title = time_format;
        }
    }
    else if(date == '') { //只剩month不为空的情况，表示持续在当前月的事件
        time_format = month + "月";
        time_title = time_format;
    }
    else if(month == time.month && date == time.date) {
        time_format = "今天";
    }
    else if(month == (tommorow.getMonth()+1) && date == tommorow.getDate()) {
        time_format = "明天";
    }
    else if(month == (after_tommorrow.getMonth()+1) && date == after_tommorrow.getDate()) {
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

function addThingsOnList(thing, year, month ,date, x, y) { //在List上添加
    var result = processTime(year, month ,date);
    var time_format = result.time_format;
    var time_title = result.time_title;
    var time_class = result.time_class;

    var li_thing = "<li class='thing'>"+thing+"</li>";
    var li_ddl = "<li class='ddl "+time_class+"' title='"+time_title+"'>"+time_format+"</li>";
    var li_check = "<li class='state'><div class='check' data-thing="+thing+"></div></li>";
    $('.things').append("<div>" + li_thing + li_ddl + li_check +"</div>");
}

function clearList() {
    $(".things").empty();
}