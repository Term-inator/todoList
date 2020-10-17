
$('#add').click(() => {
    var thing = $("#thing").val();
    if(thing != "") {
        var month = $('#month option:selected').val();
        var date = $('#date option:selected').val();
        if(data.things.find(item => item.thing == thing)) {
            alert('事件"'+thing+'"已存在！');
        }else {
            addThings(thing, month, date, cvs.width/2, cvs.height/2);
            $("#thing").val("");
        }  
    }else {
        alert("事件不能为空！");
    }
})

$('.things').on('click', '.check',((e) => {
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
}))

function init() {
    $('#month').val(time.month);
    reset_date();
    $('#date').val(time.date);
}

window.onload = function() {
    init();
    loadData();
    //clearData();
}

window.onbeforeunload = function() {
    saveData();
}