document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.getElementById('save-button');
    const popupHourSelect = document.getElementById('popup-hour');
    const popupMinuteSelect = document.getElementById('popup-minute');
    const popupAmPmSelect = document.getElementById('popup-am-pm');
    const storedTimeValue = document.getElementById('stored-time-value');

    // Load the stored popup time and set the dropdown values
    chrome.storage.sync.get(['popupTime'], function (result) {
        const storedTime = result.popupTime;
        if (storedTime) {
            const storedDate = new Date(storedTime);
            const storedHour = storedDate.getHours() % 12 || 12; // Convert 0 to 12
            const storedMinute = storedDate.getMinutes();
            const storedAmPm = storedDate.getHours() >= 12 ? 'PM' : 'AM';

            populateDropdown(popupHourSelect, 1, 12, storedHour);
            populateDropdown(popupMinuteSelect, 0, 59, storedMinute);
            setDropdownValue(popupAmPmSelect, storedAmPm);

            // Display the stored value underneath the dropdown
            storedTimeValue.textContent = formatTime(storedHour, storedMinute, storedAmPm);
        } else {
            // Default value for 5 PM
            setDropdownValue(popupHourSelect, '05');
            setDropdownValue(popupMinuteSelect, '00');
            setDropdownValue(popupAmPmSelect, 'PM');
            storedTimeValue.textContent = 'Stored Time: 5:00 PM';
        }
    });

    saveButton.addEventListener('click', function () {
        const selectedHour = popupHourSelect.value;
        const selectedMinute = popupMinuteSelect.value;
        const selectedAmPm = popupAmPmSelect.value;

        // Convert selected values to 24-hour format
        let hour24 = parseInt(selectedHour);
        if (selectedAmPm === 'PM' && hour24 !== 12) {
            hour24 += 12;
        } else if (selectedAmPm === 'AM' && hour24 === 12) {
            hour24 = 0;
        }

        const popupTime = new Date().setHours(hour24, selectedMinute);

        chrome.storage.sync.set({ popupTime: popupTime }, function () {
            console.log('Popup time set:', new Date(popupTime).toLocaleTimeString());

            // Display the stored value underneath the dropdown
            storedTimeValue.textContent = formatTime(hour24, selectedMinute, selectedAmPm);
        });
    });

    // Function to format time
    function formatTime(hour, minute, amPm) {
        const formattedHour = (hour % 12 || 12).toString();
        const formattedMinute = minute.toString().padStart(2, '0');
        const formattedAmPm = amPm.toLowerCase();
        return `${formattedHour}:${formattedMinute} ${formattedAmPm}`;
    }

    // Function to populate a dropdown with options
    function populateDropdown(selectElement, start, end, selectedValue) {
        for (let i = start; i <= end; i++) {
            const option = document.createElement('option');
            option.value = i < 10 ? '0' + i : '' + i;
            option.text = i < 10 ? '0' + i : '' + i;
            selectElement.add(option);
        }

        // Set the selected value
        setDropdownValue(selectElement, selectedValue);
    }

    // Function to set the dropdown value
    function setDropdownValue(selectElement, value) {
        const option = Array.from(selectElement.options).find(opt => opt.value === value);
        if (option) {
            option.selected = true;
        }
    }
});
