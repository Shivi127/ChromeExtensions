document.addEventListener('DOMContentLoaded', function() {
    const currentDateElement = document.getElementById('current-date');
    const noteInput = document.getElementById('note-input');
    const saveButton = document.getElementById('save-button');
    const notesList = document.getElementById('notes-list');

    // Display current date
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = currentDate.toLocaleDateString('en-US', options);

    // Load notes from localStorage
    loadNotes();

    // Save note button click event
    saveButton.addEventListener('click', function() {
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            saveNoteToLocalStorage(noteText);
            noteInput.value = ''; // Clear input after saving
            loadNotes(); // Reload notes
        }
    });

    // Function to save note to localStorage
    function saveNoteToLocalStorage(note) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({ text: note, timestamp: new Date().getTime() });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Function to load notes from localStorage and display them
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notesList.innerHTML = '';
        notes.forEach(note => {
            const noteItem = document.createElement('li');
            noteItem.classList.add('note-item');

            const noteText = document.createElement('div');
            noteText.textContent = note.text;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                deleteNoteFromLocalStorage(note.timestamp);
                loadNotes();
            });

            noteItem.appendChild(noteText);
            noteItem.appendChild(deleteButton);

            notesList.appendChild(noteItem);
        });
    }

    // Function to delete note from localStorage
    function deleteNoteFromLocalStorage(timestamp) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const updatedNotes = notes.filter(note => note.timestamp !== timestamp);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
});
