document.addEventListener('DOMContentLoaded', function () {
    const noteInput = document.getElementById('note-input');
    const BigTag = document.getElementById('tag-small-win');
    const MediumTag = document.getElementById('tag-medium-win');
    const SmallTag = document.getElementById('tag-big-win');
    const addNoteButton = document.getElementById('add-note');
    const notesContainer = document.getElementById('notes-container');

    // Store notes in an object where keys are tags and values are arrays of notes
    const noteData = {
        Big: [],
        Medium: [],
        Small: []
    };

    // Load stored notes from Chrome storage
    chrome.storage.sync.get(['noteData'], function (result) {
        const storedNoteData = result.noteData;
        if (storedNoteData) {
            // Use stored notes data if available
            Object.assign(noteData, storedNoteData);
            // Display notes on the initial load
            displayNotes();
        }
    });

    addNoteButton.addEventListener('click', function () {
        const noteText = noteInput.value;
        const selectedTag = getSelectedTag();

        if (noteText.trim() !== '' && selectedTag) {
            // Add note to the corresponding tag
            noteData[selectedTag].push(noteText);

            // Save notes to Chrome storage
            chrome.storage.sync.set({ noteData }, function () {
                if (chrome.runtime.lastError) {
                    console.error('Error saving notes data:', chrome.runtime.lastError);
                } else {
                    console.log('Notes data saved:', noteData);
                }
            });

            // Display notes
            displayNotes();

            // Clear input field
            noteInput.value = '';
        }
    });

    function getSelectedTag() {
        if (BigTag.checked) {
            return 'Big';
        } else if (MediumTag.checked) {
            return 'Medium';
        } else if (SmallTag.checked) {
            return 'Small';
        }

        return null; // No tag selected
    }

    function displayNotes() {
        // Clear existing content
        notesContainer.innerHTML = '';

        // Display notes for each tag
        for (const [tag, notes] of Object.entries(noteData)) {
            // Create a container for each tag
            const tagContainer = document.createElement('div');
            tagContainer.classList.add('tag-container2');

            // Display tag as title
            const tagTitle = document.createElement('h2');
            tagTitle.textContent = `${tag} Wins`;
            tagContainer.appendChild(tagTitle);

            // Display notes for the tag
            const notesList = document.createElement('ul');
            notes.forEach((noteText, index) => {
                const listItem = createNoteListItem(noteText, tag, index);
                notesList.appendChild(listItem);
            });

            tagContainer.appendChild(notesList);

            // Append the tag container to the main container
            notesContainer.appendChild(tagContainer);
        }
    }

    function createNoteListItem(noteText, tag, index) {
        const listItem = document.createElement('li');
        listItem.classList.add('note-list-item'); // Add a class for styling
    
        const noteContainer = document.createElement('div');
        noteContainer.classList.add('note-container');
    
        const noteElement = document.createElement('p');
        noteElement.textContent = noteText;
    
        const deleteButton = document.createElement('div');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '&times;';
        deleteButton.addEventListener('click', function () {
            deleteNote(tag, index);
        });
    
        noteContainer.appendChild(noteElement);
        noteContainer.appendChild(deleteButton);
    
        listItem.appendChild(noteContainer);
    
        return listItem;
    }

    function deleteNote(tag, index) {
        // Remove the note from the corresponding tag
        noteData[tag].splice(index, 1);

        // Save updated notes to Chrome storage
        chrome.storage.sync.set({ noteData }, function () {
            if (chrome.runtime.lastError) {
                console.error('Error saving notes data:', chrome.runtime.lastError);
            } else {
                console.log('Notes data saved:', noteData);
                // Display updated notes
                displayNotes();
            }
        });
    }

    // Initial display
    displayNotes();
});
