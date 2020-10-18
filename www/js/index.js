
$('#add').click(() => {
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
            addThings(thing, year, month, date, cvs.width/2, cvs.height/2);
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

$('#ddl').click(() => {
    if($('#ddl').hasClass("head-active")) {
        $('#ddl').removeClass("head-active");
        data.ddl_sorted = false;
        window.location.reload();
    }else {
        $('#ddl').addClass("head-active");
        data.ddl_sorted = true;
        window.location.reload();
    }
})

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