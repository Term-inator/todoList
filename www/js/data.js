var data = {
    ddl_sorted: false,
    things: []
}
var things_sorted = []; //things的缓冲区，用于排序


function loadData() {
    var tmp = localStorage.getItem("data");
    if(tmp != null) {
        data = JSON.parse(tmp);
        console.log(data);
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

function sortByDdl() {
    things_sorted.sort(function(a, b) { //按ddl排序
        if(a.ddl.year != b.ddl.year) {
            if(a.ddl.year == '') {
                return 1;
            }
            if(b.ddl.year == '') {
                return -1;
            }
            return a.ddl.year - b.ddl.year;
        }

        if(a.ddl.month != b.ddl.month) {
            if(a.ddl.month == '') {
                return 1;
            }
            if(b.ddl.month == '') {
                return -1;
            }
            return a.ddl.month - b.ddl.month;
        }
        if(a.ddl.date != b.ddl.date) {
            if(a.ddl.date == '') {
                return 1;
            }
            if(b.ddl.date == '') {
                return -1;
            }
            return a.ddl.date - b.ddl.date;
        }
        return a.thing - b.thing;
    })
    console.log(things_sorted);
}

function loadList(operation) {
    $('.things').append("<div><li class='head thing'>事件</li><li class='head ddl' id='ddl'>ddl</li><li class='state'></li></div>");
    if(operation == "refresh" || operation == "update") { //刷新页面时 || 更新事件时 重加载List
        things_sorted = data.things.slice(0); //深拷贝 刷新 || 更新时要同步更新things_sorted
        sortByDdl(); //排序初始化的things_sorted

        if(data.ddl_sorted) { //上次要求按ddl排序则延续该设置
            $('#ddl').addClass("head-active");
            sortByDdl();
            things_sorted.forEach(e => {
                addThingsOnList(e.thing, e.ddl.year, e.ddl.month, e.ddl.date, e.state, e.position.x, e.position.y);
            })
        }else {
            data.things.forEach(e => {
                addThingsOnList(e.thing, e.ddl.year, e.ddl.month, e.ddl.date, e.state, e.position.x, e.position.y);
            })
        }
    }
    else if(operation == "sort") { //如果是因为排序而重加载List，则不需要再次排序；如果是要取消排序，则直接显示data.things即可，不需要调用该函数
        if(data.ddl_sorted) { //上次要求按ddl排序则延续该设置
            $('#ddl').addClass("head-active");
            things_sorted.forEach(e => {
                addThingsOnList(e.thing, e.ddl.year, e.ddl.month, e.ddl.date, e.state, e.position.x, e.position.y);
            })
        }else {
            data.things.forEach(e => {
                addThingsOnList(e.thing, e.ddl.year, e.ddl.month, e.ddl.date, e.state, e.position.x, e.position.y);
            })
        }
    }
    else if(operation == "modify") { //刷新页面时 || 更新事件时 重加载List
        things_sorted = data.things.slice(0); //深拷贝 刷新 || 更新时要同步更新things_sorted
        
        if(data.ddl_sorted) { //上次要求按ddl排序则延续该设置
            $('#ddl').addClass("head-active");
            sortByDdl();
            things_sorted.forEach(e => {
                addThingsOnList(e.thing, e.ddl.year, e.ddl.month, e.ddl.date, e.state, e.position.x, e.position.y);
            })
        }else {
            data.things.forEach(e => {
                addThingsOnList(e.thing, e.ddl.year, e.ddl.month, e.ddl.date, e.state, e.position.x, e.position.y);
            })
        }
    }
    else {
        console.log("error at function loadList: invalid parameter operation");
    }
}

function loadGraph() {
    initGraph();

    console.log(data)
    data.things.forEach(e => {
        addThingsOnGraph(e.thing, e.ddl.year, e.ddl.month, e.ddl.date, e.position.x, e.position.y);
    })
}

function loadUI() {
    loadList("refresh");
    loadGraph();
}

function reloadList(operation) { //operation：执行的操作
    clearList();
    loadList(operation);
}

function reloadGraph() {
    clearGraph();
    initGraph(); //初始化象限
    loadGraph();
}