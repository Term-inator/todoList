
function init() {
    $('#month').val(time.month);
    reset_date();
    $('#date').val(time.date);
    initGraph(); //初始化象限
}

window.onload = function() {
    loadData();
    console.log("loaded at " + now);
    init();
    activateReloadMonitor();
    //clearData();
}

window.onbeforeunload = function() {
    saveData();
}