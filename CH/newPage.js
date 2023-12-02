document.addEventListener('DOMContentLoaded', function () {
    const noteInput = document.getElementById('note-input');
    const personalTag = document.getElementById('tag-personal');
    const workTag = document.getElementById('tag-work');
    const otherTag = document.getElementById('tag-other');
    const addNoteButton = document.getElementById('add-note');
    const notesContainer = document.getElementById('notes-container');

    // Store notes in an object where keys are tags and values are arrays of notes
    const noteData = {
        Personal: [],
        Work: [],
        Other: []
    };

    addNoteButton.addEventListener('click', function () {
        const noteText = noteInput.value;
        const selectedTag = getSelectedTag();

        if (noteText.trim() !== '' && selectedTag) {
            // Add note to the corresponding tag
            noteData[selectedTag].push(noteText);

            // Display notes
            displayNotes();

            // Clear input field
            noteInput.value = '';
        }
    });

    function getSelectedTag() {
        if (personalTag.checked) {
            return 'Personal';
        } else if (workTag.checked) {
            return 'Work';
        } else if (otherTag.checked) {
            return 'Other';
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
            tagContainer.classList.add('tag-container');

            // Display tag as title
            const tagTitle = document.createElement('h2');
            tagTitle.textContent = `${tag} Tasks`;
            tagContainer.appendChild(tagTitle);

            // Display notes for the tag
            const notesList = document.createElement('ul');
            notes.forEach(noteText => {
                const noteElement = createNoteElement(noteText);
                const listItem = document.createElement('li');
                listItem.appendChild(noteElement);
                notesList.appendChild(listItem);
            });

            tagContainer.appendChild(notesList);

            // Append the tag container to the main container
            notesContainer.appendChild(tagContainer);
        }
    }

    function createNoteElement(noteText) {
        const noteElement = document.createElement('p');
        noteElement.textContent = noteText;
        return noteElement;
    }

    // Initial display
    displayNotes();
});
