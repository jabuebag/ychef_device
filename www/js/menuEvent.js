var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var calendarInline;
var pickerTime;
var eventsTime = [];
var menuEventsTime = {};
var pickerTimeValue = [];
var pickerInitToken = false;

myApp.onPageBeforeInit('menu_event_page', function(page) {
    $$.getJSON('http://localhost:8080/event/fetchEventsJson/' + currentListingId, function(data) {
        var menuEvents = data;
        eventsTime = menuEvents.events.map(function(a) {
            var tempTime = new Date(a.start);
            var tempTimeStr = tempTime.getFullYear() + '' + tempTime.getMonth() + '' + tempTime.getDate();
            var eventMinutes = tempTime.getMinutes() == 0 ? '00' : tempTime.getMinutes();
            menuEventsTime[tempTimeStr] = tempTime.getHours() + ':' + eventMinutes;
            return tempTimeStr;
        });

        calendarInline = myApp.calendar({
            container: '#calendar-event-container',
            weekHeader: true,
            disabled: function(date) {
                if (eventsTime.indexOf(date.getFullYear() + '' + date.getMonth() + '' + date.getDate()) == -1) {
                    return true;
                } else {
                    return false;
                }
            },
            toolbarTemplate: '<div class="toolbar calendar-custom-toolbar">' +
                '<div class="toolbar-inner">' +
                '<div class="left">' +
                '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                '</div>' +
                '<div class="center"></div>' +
                '<div class="right">' +
                '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                '</div>' +
                '</div>' +
                '</div>',
            onOpen: function(p) {
                $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
                $$('.calendar-custom-toolbar .left .link').on('click', function() {
                    calendarInline.prevMonth();
                });
                $$('.calendar-custom-toolbar .right .link').on('click', function() {
                    calendarInline.nextMonth();
                });
            },
            onMonthYearChangeStart: function(p) {
                $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
            },
            onDayClick: function(p, dayContainer, year, month, day) {
                if (pickerTime) {
                    pickerTime.destroy();
                }
                var timekey = year + month + day;
                pickerTimeValue = [];
                pickerTimeValue.push(menuEventsTime[timekey]);
                pickerTime = myApp.picker({
                    input: '#picker-time',
                    closeByOutsideClick: true,
                    cols: [{
                        textAlign: 'center',
                        values: pickerTimeValue
                    }]
                });
            }
        });

        $$('#picker-time').on('click', function() {
            if (pickerTimeValue.length == 0) {
                myApp.alert('请先选择日期');
            }
        });
    });
});
