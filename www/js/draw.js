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

function addThings(thing, month, date, x, y) {
    $('.things').append("<div><li class='thing'>"+thing+"</li><li class='ddl'>"+month+"月"+date+"日"+"</li><li class='state'><div class='check' data-thing="+thing+"></div></li></div>");

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
                month: month,
                date: date
            },
            position: {
                x: cvs.width/2,
                y: cvs.height/2
            },
            state: true
        });
    }

    existed_thing = data.things.find(item => item.thing == thing); //更新内容
}