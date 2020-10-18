var data = {
    ddl_sorted: false,
    things: []
}
var things_buffer = []; //things的缓冲区，用于排序

function sort_by_ddl() {
    things_buffer.sort(function(a, b) { //按ddl排序
        if(a.ddl.year != b.ddl.year) {
            return a.ddl.year - b.ddl.year;
        }

        if(a.ddl.month == '') {
            a.ddl.month = 50; //为空则排在12后
        }
        if(b.ddl.month == '') {
            b.ddl.month = 50; //为空则排在12后
        }

        if(a.ddl.date == '') {
            a.ddl.date = 50; //为空则排在31后
        }
        if(b.ddl.month == '') {
            b.ddl.month = 50; //为空则排在31后
        }

        if(a.ddl.month != b.ddl.month) {
            return a.ddl.month - b.ddl.month;
        }
        if(a.ddl.date != b.ddl.date) {
            return a.ddl.date - b.ddl.date;
        }
        return a.thing - b.thing;
    })
    console.log(things_buffer);
}

function loadUI() {
    if(data.ddl_sorted) { //上次要求按ddl排序则延续该设置
        $('#ddl').addClass("head-active");
        sort_by_ddl();
        things_buffer.forEach(e => {
            addThings(e.thing, e.ddl.year, e.ddl.month, e.ddl.date, e.position.x, e.position.y);
        })
    }else {
        data.things.forEach(e => {
            addThings(e.thing, e.ddl.year, e.ddl.month, e.ddl.date, e.position.x, e.position.y);
        })
    }
}

function loadData() {
    var tmp = localStorage.getItem("data");
    if(tmp != null) {
        data = JSON.parse(tmp);
        console.log(data);
        things_buffer = data.things.slice(0); //深拷贝
        loadUI();
    }
}

function saveData() {
    for(var index = 0; index < data.things.length; ++index) {
        if(data.things[index].state == false) {
            data.things.splice(index, 1);
            --index;
        }
    }
    localStorage.setItem("data",JSON.stringify(data))
}

function clearData() {
    localStorage.clear();
}