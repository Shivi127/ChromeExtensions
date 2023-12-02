document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('save-button');
    const popupTimeSelect = document.getElementById('popup-time');

    // Load the stored popup time and set the dropdown value
    chrome.storage.sync.get(['popupTime'], function(result) {
        const storedTime = result.popupTime;
        if (storedTime) {
            const formattedStoredTime = new Date(storedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            popupTimeSelect.value = formattedStoredTime;
        }
    });

    saveButton.addEventListener('click', function() {
        const selectedTime = popupTimeSelect.value;
        const [hours, minutes] = selectedTime.split(':');
        const popupTime = new Date().setHours(hours, minutes);

        chrome.storage.sync.set({ popupTime: popupTime }, function() {
            console.log('Popup time set:', new Date(popupTime).toLocaleTimeString());
        });
    });
});
