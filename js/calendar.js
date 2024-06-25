function render() {
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
        }
    });
    calendar.render();
}

document.addEventListener('DOMContentLoaded', function () {
    render();
});