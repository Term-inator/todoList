
function init() {
    $('#month').val(time.month);
    reset_date();
    $('#date').val(time.date);
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