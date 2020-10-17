var data = {
    things: []
}

function loadData() {
    var tmp = localStorage.getItem("data");
    if(tmp != null) {
        data = JSON.parse(tmp)
        console.log(data);
        loadUI();
    }
}

function saveData() {
    data.things.forEach((item,index) => {
        if(item.state == false) {
            data.things.splice(index, 1);
        }
    })
    localStorage.setItem("data",JSON.stringify(data))
}

function clearData() {
    localStorage.clear();
}

function loadUI() {
    data.things.forEach(e => {
        addThings(e.thing, e.ddl.month, e.ddl.date, e.position.x, e.position.y);
    })
}