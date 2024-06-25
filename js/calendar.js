function addEventToJson(event) {
    var events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
}

function render() {
    var events = JSON.parse(localStorage.getItem('events')) || [];
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWorkTime',
        views: {
            timeGridWorkTime: {
                type: 'timeGrid',
                duration: { weeks: 1 },
                buttonText: 'work times',
                slotMinTime: '7:00:00',
                slotMaxTime: '22:00:00',
            }
        },
        nowIndicator: true,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWorkTime,timeGridWeek,timeGridDay'
        },
        selectable: true,
        select: function (info) {
            console.log(info);
            var title = prompt('Event Title:');
            if (title) {
                calendar.addEvent({
                    title: title,
                    start: info.startStr,
                    end: info.endStr
                });
                addEventToJson({
                    title: title,
                    start: info.startStr,
                    end: info.endStr
                });
            }
        },
        events: events
    });
    calendar.render();
}

document.addEventListener('DOMContentLoaded', function () {
    render();
});