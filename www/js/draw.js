var mouse_position = {
    x: 0,
    y: 0
}

$('#canvas').mousemove(function(e) {
    mouse_position.x = e.pageX;
    mouse_position.y = e.pageY;
});

var canvas = $('#canvas');
var cvs = {
    width: canvas.attr('width'),
    height: canvas.attr('height')
}

canvas.drawPath({
    strokeStyle: '#000',
    strokeWidth: 3,
    layer: true,
    p1: { //x
        type: 'line',
        rounded: true,
        endArrow: true,
        arrowRadius: 25,
        arrowAngle: 90,
        x1: 0, y1: cvs.height/2,
        x2: cvs.width*0.99, y2: cvs.height/2
    },
    p2: { //y
        type: 'line',
        rounded: true,
        endArrow: true,
        arrowRadius: 25,
        arrowAngle: 90,
        x1: cvs.width/2, y1: cvs.height,
        x2: cvs.width/2, y2: 0+5
    }
});

canvas.drawText({
    fillStyle: '#000',
    strokeWidth: 1,
    layer: true,
    x: cvs.width*0.95, y: cvs.height/2*1.1,
    fontSize: 24,
    fontFamily: 'Verdana, sans-serif',
    text: '重要'
});

canvas.drawText({
    fillStyle: '#000',
    strokeWidth: 1,
    layer: true,
    x: 0+40, y: cvs.height/2*1.1,
    fontSize: 24,
    fontFamily: 'Verdana, sans-serif',
    text: '不重要'
});

canvas.drawText({
    fillStyle: '#000',
    strokeWidth: 1,
    layer: true,
    x: cvs.width/2*1.15, y: 0+15,
    fontSize: 24,
    fontFamily: 'Verdana, sans-serif',
    text: '紧急'
});

canvas.drawText({
    fillStyle: '#000',
    strokeWidth: 1,
    layer: true,
    x: cvs.width/2*1.15, y: cvs.height*0.98,
    fontSize: 24,
    fontFamily: 'Verdana, sans-serif',
    text: '不紧急'
});

function addThings(thing, year, month, date, x, y) {
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

    //列表中显示事件
    var li_thing = "<li class='thing'>"+thing+"</li>";
    var li_ddl = "<li class='ddl "+time_class+"' title='"+time_title+"'>"+time_format+"</li>";
    var li_check = "<li class='state'><div class='check' data-thing="+thing+"></div></li>";
    $('.things').append("<div>" + li_thing + li_ddl + li_check +"</div>");

    var existed_thing = data.things.find(item => item.thing == thing);
    var pre_x ,pre_y ,now_x ,now_y;
    var offset_x, offset_y;
    canvas.drawText({
        fillStyle: '#000',
        strokeWidth: 1,
        layer: true,
        x: x, y: y,
        fontSize: 20,
        fontFamily: 'Verdana, sans-serif',
        text: thing,
        draggable: true,
        dragstart: function() {
            console.log(1);
            pre_x = mouse_position.x;
            pre_y = mouse_position.y;
        },
        dragstop: function() {
            console.log(2);
            now_x = mouse_position.x;
            now_y = mouse_position.y;
            offset_x = now_x - pre_x;
            offset_y = now_y - pre_y;

            if(existed_thing) {
                existed_thing.position.x += offset_x;
                existed_thing.position.y += offset_y;
            }
        }
    });

    if(existed_thing == null) {
        data.things.push({
            thing: thing,
            ddl: {
                year: year,
                month: month,
                date: date
            },
            position: {
                x: cvs.width/2,
                y: cvs.height/2
            },
            state: true //表示是否被删除
        });
    }

    existed_thing = data.things.find(item => item.thing == thing); //更新内容
}