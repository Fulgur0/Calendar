function addEventToJson(event) {
    var events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
}

function updateEventToJson(event) {
    var events = JSON.parse(localStorage.getItem('events')) || [];
    var index = events.findIndex(function (e) {
        return e.id == event.id;
    });
    if (index !== -1) {
        events[index] = event;
    }
    localStorage.setItem('events', JSON.stringify(events));
}

function render() {
    var events = JSON.parse(localStorage.getItem('events')) || [];
    var eventCount = events.length;
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
        events: events,
        selectable: true,
        select: function (info) {
            console.log(info);
            var title = prompt('Event Title:');
            if (title) {
                calendar.addEvent({
                    title: title,
                    start: info.startStr,
                    end: info.endStr,
                    id: eventCount
                });
                addEventToJson({
                    title: title,
                    start: info.startStr,
                    end: info.endStr,
                    id: eventCount
                });
                eventCount++;
            }
        },
        editable: true,
        eventDrop: function (info) {
            var event = info.event;
            updateEventToJson({
                title: event.title,
                start: event.startStr,
                end: event.endStr,
                id: event.id
            });
        },
        eventResize: function (info) {
            var event = info.event;
            updateEventToJson({
                title: event.title,
                start: event.startStr,
                end: event.endStr,
                id: event.id
            });
        },
    });
    calendar.render();
}

document.addEventListener('DOMContentLoaded', function () {
    render();
});