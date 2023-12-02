chrome.runtime.onInstalled.addListener(function() {
    console.log('Extension installed.');
    chrome.alarms.create('popupAlarm', { periodInMinutes: 1 }); // Set a period to check every minute
});

chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'popupAlarm') {
        checkPopupTime();
    }
});

function checkPopupTime() {
    chrome.storage.sync.get(['popupTime'], function(result) {
        const popupTime = result.popupTime;

        if (popupTime && isCurrentTimeEqualPopupTime(popupTime)) {
            openNewPage();
        }
    });
}

function isCurrentTimeEqualPopupTime(popupTime) {
    const currentTime = new Date();
    const storedTime = new Date(popupTime);

    return currentTime.getHours() === storedTime.getHours() &&
           currentTime.getMinutes() === storedTime.getMinutes();
}

function openNewPage() {
    chrome.tabs.create({ url: chrome.runtime.getURL('newPage.html') });
}
