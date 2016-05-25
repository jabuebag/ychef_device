var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var calendarInline;
var pickerTime;
var pickerPeople;
var eventsTime = [];
var menuEventsTime = {};
var menuEventsId = {};
var eventId;
var pickerTimeValues = [];
var pickerTimeValue;
var pickerPeopleValues = [];
var pickerPeopleValue;
var pageInitToken = false;

myApp.onPageBeforeInit('menu_event_page', function(page) {
    pickerTimeValues = [];
    pickerTimeValue = null;
    initEventPage();
});

function initEventPage() {
    $$.getJSON('http://192.168.1.52:8080/event/fetchEventsJson/' + currentListingId, function(data) {
        var menuEvents = data;
        eventsTime = menuEvents.events.map(function(a) {
            var tempTime = new Date(a.start);
            var tempTimeStr = tempTime.getFullYear() + '' + tempTime.getMonth() + '' + tempTime.getDate();
            var eventMinutes = tempTime.getMinutes() == 0 ? '00' : tempTime.getMinutes();
            menuEventsTime[tempTimeStr] = tempTime.getHours() + ':' + eventMinutes;
            menuEventsId[tempTimeStr] = a._id;
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
                pickerTimeValues = [];
                pickerTimeValue = null;
                pickerTimeValues.push(menuEventsTime[timekey]);
                eventId = menuEventsId[timekey];
                pickerTime = myApp.picker({
                    input: '#picker-time',
                    closeByOutsideClick: true,
                    cols: [{
                        textAlign: 'center',
                        values: pickerTimeValues
                    }],
                    onChange: function() {
                        pickerTimeValue = pickerTime.value;
                    }
                });
            }
        });

        pickerPeople = myApp.picker({
            input: '#picker-people',
            closeByOutsideClick: true,
            cols: [{
                textAlign: 'center',
                values: [1, 2, 3]
            }],
            onChange: function() {
                pickerPeopleValue = pickerPeople.value;
            }
        });

        $$('#picker-time').on('click', function() {
            if (pickerTimeValues.length == 0) {
                myApp.alert('请先选择日期');
            }
        });

        $$('#event-pay-button').on('click', function() {
            if (pickerTimeValues.length == 0) {
                myApp.alert('请选择日期和时间');
            } else if (!pickerTimeValue) {
                myApp.alert('请选择活动时间');
            } else if (!pickerPeopleValue) {
                myApp.alert('请选择预订人数');
            } else if (!eventId) {
                myApp.alert('系统故障，请重新预订')
            } else {
                var data = '{"eventId" : "' + eventId + '" , "quantity" : "' + pickerPeopleValue + '" }';
                var data = JSON.parse(data);

                $.ajax({
                    type: "POST",
                    cache: true,
                    data: data,
                    url: "http://192.168.1.52:8080/booking/bookJson/" + currentListingId,
                    crossDomain: true,
                    jsonpCallback: 'callback',
                    dataType: 'jsonp',
                    success: function(responseData) {
                        homeView.router.loadPage({
                            url: 'payment.html',
                            animatePages: true
                        });

                    },
                    error: function(responseData) {
                        myApp.alert("系统故障，请重新预订");
                    }
                });

            }
        });
    });
}
