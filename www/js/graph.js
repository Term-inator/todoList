var mouse_position = {
    x: 0,
    y: 0
}

var canvas; //initGraph()中动态创建

var cvs = {
    width: 770,
    height: 670
}

function initGraph() {
    $('.show').append("<canvas id='canvas' width='"+cvs.width+"' height='"+cvs.height+"'></canvas>");
    canvas = $('#canvas');

    $('.main').mousemove(function(e) {
        mouse_position.x = e.pageX;
        mouse_position.y = e.pageY;
    });

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
}

function clearGraph() {
    $('.show').empty();
}

function addThingsOnGraph(thing, year, month, date, x, y) { //在象限图上添加
    var result = processTime(year, month ,date);
    var time_format = result.time_format;
    var time_title = result.time_title;
    var time_class = result.time_class;

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