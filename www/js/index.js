
size = {
    width: $(window).width(),
    height: $(window).height()
}

window.onresize = function() {
    size.width = $(window).width();
    size.height = $(window).height();
}

function init() {
    loadData();
    console.log("loaded at " + now);
    initCalendar();
    activateReloadMonitor();
}

window.onload = function() {
    init();
    //clearData();
}

window.onbeforeunload = function() {
    saveData();
}
