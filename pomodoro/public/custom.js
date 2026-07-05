/*global Timer*/
var timers = {};
$(function () {
    $(".dropdown-menu li a").click(function () {
        var selText = $(this).text();
        $('#dropdownbutton').html(selText + ' <span class="caret"></span>');
        $('#notifications').val(selText);
    });
    $("#pomodoro-minus").on("click", function () {
        $("#pomodoro-preset-timer").val(parseInt($("#pomodoro-preset-timer").val(), 10) - 1);
    });
    $("#pomodoro-plus").on("click", function () {
        $("#pomodoro-preset-timer").val(parseInt($("#pomodoro-preset-timer").val(), 10) + 1);
    });
    $("#break-minus").on("click", function () {
        $("#break-preset-timer").val(parseInt($("#break-preset-timer").val(), 10) - 1);
    });
    $("#break-plus").on("click", function () {
        $("#break-preset-timer").val(parseInt($("#break-preset-timer").val(), 10) + 1);
    });
    $("#pause").on("click", function () {
        if (typeof timers.pomodoro !== 'undefined') {
            timers.pomodoro.pause();
        }
    });
    $('#start').on({ 'touchstart' : function(){
            if (typeof timers.pomodoro !== 'undefined') {
            timers.pomodoro.start();
        } else {
            var workTime = parseFloat($("#pomodoro-preset-timer").val());
            var breakTime = parseFloat($("#break-preset-timer").val());
            workit(workTime,breakTime);
        }
    } });
    $("#start").on("click", function () {
        if (typeof timers.pomodoro !== 'undefined') {
            timers.pomodoro.start();
        } else {
            var workTime = parseFloat($("#pomodoro-preset-timer").val());
            var breakTime = parseFloat($("#break-preset-timer").val());
            workit(workTime,breakTime);
        }
    });

    // request permission on page load
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
    $("#stop").on("click", function () {
        if (typeof timers.pomodoro !== 'undefined') {
            timers.pomodoro.stop();
        }
        
    });
});

function workit(workTime,breakTime) {
    $('#progressbar').text('Work Hard');
    var notif = $('#notifications').val();
    var workMinutes = parseInt(workTime, 10);
    var workSeconds = parseInt((workTime - workMinutes) * 60, 10);
    if (notif === 'Start notifications only' || notif === 'Both Start and End notifications') {
        notifyMe("Start working.", workMinutes + " minutes remaining.");
    }
    timers.pomodoro = new Timer();
    timers.pomodoro.start({
        countdown: true,
        startValues: {
            minutes: workMinutes,
            seconds: workSeconds
        }
    });
    timers.startTimeinSeconds = workTime*60;
    timers.breakTimeinSeconds = breakTime*60;
    $('#timeLeft').val(timers.pomodoro.getTimeValues().toString());
    timers.pomodoro.addEventListener('secondsUpdated', function (e) {
        $('#timeLeft').val(timers.pomodoro.getTimeValues().toString());
        var timeRemaining = timers.pomodoro.getTotalTimeValues().seconds;
        var percent = 100-parseFloat((timeRemaining / timers.startTimeinSeconds) * 100).toFixed(2);
        $('#progressbar').attr('aria-valuenow',percent);
        $('#progressbar').css('width',percent + '%');
        
    });
    timers.pomodoro.addEventListener('targetAchieved', function (e) {
        breakit(breakTime,workTime);
    });
}

function breakit(breakTime, workTime) {
    $('#progressbar').text('Break Time');
    var notif = $('#notifications').val();
    var breakMinutes = parseInt(breakTime, 10);
    var breakSeconds = parseInt((breakTime - breakMinutes) * 60, 10);
if (notif === 'End notifications only' || notif === 'Both Start and End notifications') {
        notifyMe("Timer ended!", "You did it.  Take a break for " + breakMinutes + " minutes.");
    }
    timers.pomodoro = new Timer();
    timers.pomodoro.start({
        countdown: true,
        startValues: {
            minutes: breakMinutes,
            seconds: breakSeconds
        }
    });
    $('#timeLeft').val(timers.pomodoro.getTimeValues().toString());
    timers.pomodoro.addEventListener('secondsUpdated', function (e) {
        $('#timeLeft').val(timers.pomodoro.getTimeValues().toString());
        var timeRemaining = timers.pomodoro.getTotalTimeValues().seconds;
        var percent = 100-parseFloat((timeRemaining / timers.breakTimeinSeconds) * 100).toFixed(2);
        $('#progressbar').attr('aria-valuenow',percent);
        $('#progressbar').css('width',percent + '%');
    });
    timers.pomodoro.addEventListener('targetAchieved', function (e) {
        workit(workTime,breakTime);
    });
}

function notifyMe(title, message) {
    if ($('#notifications').attr('value') !== 'No notifications') {
        if (!Notification) {
            alert('Desktop notifications not available in your browser. Try Chromium.');
            return;
        }

        if (Notification.permission !== "granted")
            Notification.requestPermission();
        else {
            var notification = new Notification(title, {
                icon: 'clock.jpg',
                body: message,
            });

            notification.onclick = function () {
                window.open("http://stackoverflow.com/a/13328397/1269037");
            };

        }
    }

}
