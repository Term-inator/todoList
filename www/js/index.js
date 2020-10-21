
function init() {
    $('#month').val(time.month);
    reset_date();
    $('#date').val(time.date);
    initGraph(); //初始化象限
}

window.onload = function() {
    init();
    loadData();
    console.log("loaded at " + now);
    activateReloadMonitor();
    //clearData();
}

window.onbeforeunload = function() {
    saveData();
}