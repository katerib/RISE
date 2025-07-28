function fmtDate(date) {
    return date.toISOString().split('.')[0].replace('T', ' ');
}

function updateTime() {
    const timeDisplays = document.getElementsByClassName('time');
    const doc = document.documentElement;
    const isMars = doc.getAttribute('data-theme') === 'mars';

    const earthDate = new Date();
    const marsDate = new MarsDate(earthDate);
    const earthDateFmt = fmtDate(earthDate);
    const marsDateFmt = fmtDate(marsDate);

    for (const timeDisplay of timeDisplays) {
        timeDisplay.textContent = isMars ? marsDateFmt : earthDateFmt;
        timeDisplay.setAttribute('title', isMars ? marsDate.toDateString() : earthDate.toDateString());
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    setInterval(updateTime, 1000);
});
