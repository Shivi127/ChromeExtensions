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
