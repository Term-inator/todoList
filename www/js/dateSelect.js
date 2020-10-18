var now = new Date();
var one_day = 24*60*60*1000;
var tommorow = new Date(now.getTime() + one_day);
var after_tommorrow = new Date(tommorow.getTime() + one_day);

var time = {
    year: now.getFullYear(),
    month: now.getMonth()+1,
    date: now.getDate(),
    is_lunar: false,
}

setInterval(() => {
    now = new Date();
    if(now.getHours() == 13) {
        window.location.reload();
    }
}, 3600000)

if(time.year%400 == 0 || (time.year%100 != 0 && time.year%4 == 0)){
    time.is_lunar = true;
}

$("#month").append("<option value=''></option>");
for(var month = 1; month <= 12; ++month) {
    $("#month").append("<option value='"+month+"'>"+month+"</option>");
}

function reset_date() {
    $('#date').empty();
    var month = $('#month option:selected').val();
    var days = 31;
    switch(month) {
        case '1': {
            days = 31;
            break;
        }
        case '2': {
            if(time.is_lunar) {
                days = 29;
            }else {
                days = 28;
            }
            break;
        }
        case '3': {
            days = 31;
            break;
        }
        case '4': {
            days = 30;
            break;
        }
        case '5': {
            days = 31;
            break;
        }
        case '6': {
            days = 30;
            break;
        }
        case '7': {
            days = 31;
            break;
        }
        case '8': {
            days = 31;
            break;
        }
        case '9': {
            days = 30;
            break;
        }
        case '10': {
            days = 31;
            break;
        }
        case '11': {
            days = 30;
            break;
        }
        case '12': {
            days = 31;
            break;
        }
        default: break;
    }

    $("#date").append("<option value=''></option>");
    for(var date = 1; date <= days; ++date) {
        $("#date").append("<option value='"+date+"'>"+date+"</option>");
    }
}

$('#month').change(() => {
    reset_date();
})