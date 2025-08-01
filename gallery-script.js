// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize photo upload functionality
    setupPhotoUpload();
    
    // Add sparkle effects to cards
    addSparkleEffects();
    
    // Load saved content from localStorage
    loadSavedContent();
    
    // Auto-save content when edited
    setupAutoSave();
});

// Setup photo upload functionality
function setupPhotoUpload() {
    const photoInput = document.getElementById('photoInput');
    
    photoInput.addEventListener('change', function(event) {
        const files = event.target.files;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file && file.type.startsWith('image/')) {
                addPhotoToGrid(file);
            }
        }
        
        // Reset input so same file can be selected again
        photoInput.value = '';
    });
}

// Add photo to grid
function addPhotoToGrid(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const photoGrid = document.getElementById('photoGrid');
        const addPhotoCard = photoGrid.querySelector('.add-photo-card');
        
        // Create new photo card
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card sparkle-effect';
        photoCard.innerHTML = `
            <img src="${e.target.result}" alt="Beautiful Memory" class="uploaded-photo">
            <div class="photo-overlay">
                <button class="delete-photo-btn" onclick="deletePhoto(this)">🗑️</button>
            </div>
        `;
        
        // Add entrance animation
        photoCard.style.animation = 'photoSlideIn 0.8s ease-out';
        
        // Insert before the add photo card
        photoGrid.insertBefore(photoCard, addPhotoCard);
        
        // Add hover effects
        addPhotoHoverEffects(photoCard);
        
        // Save to localStorage
        savePhotosToStorage();
        
        // Show success message
        showMessage('Beautiful photo added! 📸💕');
    };
    
    reader.readAsDataURL(file);
}

// Add photo hover effects
function addPhotoHoverEffects(photoCard) {
    const img = photoCard.querySelector('.uploaded-photo');
    
    photoCard.addEventListener('mouseenter', function() {
        img.style.transform = 'scale(1.1)';
    });
    
    photoCard.addEventListener('mouseleave', function() {
        img.style.transform = 'scale(1)';
    });
}

// Delete photo
function deletePhoto(button) {
    const photoCard = button.closest('.photo-card');
    photoCard.style.animation = 'photoSlideOut 0.5s ease-in forwards';
    
    setTimeout(() => {
        photoCard.remove();
        savePhotosToStorage();
        showMessage('Photo removed 🗑️');
    }, 500);
}

// Add new photo (button click)
function addNewPhoto() {
    document.getElementById('photoInput').click();
}

// Edit song line
function editSongLine(songCard) {
    const songLine = songCard.querySelector('.song-line');
    
    // Add editing class for visual feedback
    songCard.classList.add('editing');
    
    // Focus on the song line
    songLine.focus();
    
    // Add input event listeners for real-time saving
    songLine.addEventListener('input', function() {
        saveSongLinesToStorage();
    });
    
    // Remove editing class when done
    songLine.addEventListener('blur', function() {
        songCard.classList.remove('editing');
        saveSongLinesToStorage();
    });
}

// Add new song card
function addNewSongCard() {
    const songContainer = document.querySelector('.song-container');
    const icons = ['🎵', '🎶', '💕', '🌟', '💖', '🎤', '🎧', '💫'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    
    const newSongCard = document.createElement('div');
    newSongCard.className = 'song-card';
    newSongCard.onclick = function() { editSongLine(this); };
    newSongCard.innerHTML = `
        <div class="song-icon">${randomIcon}</div>
        <div class="song-content">
            <p class="song-line" contenteditable="true">Click to add your favorite song line...</p>
        </div>
        <button class="delete-song-btn" onclick="deleteSongCard(this)">❌</button>
    `;
    
    // Add entrance animation
    newSongCard.style.animation = 'slideInLeft 0.6s ease-out';
    
    songContainer.appendChild(newSongCard);
    
    // Auto-focus on the new card
    setTimeout(() => {
        const songLine = newSongCard.querySelector('.song-line');
        songLine.focus();
        songLine.select();
    }, 100);
    
    showMessage('New song line added! 🎵');
}

// Delete song card
function deleteSongCard(button) {
    const songCard = button.closest('.song-card');
    songCard.style.animation = 'slideOutRight 0.5s ease-in forwards';
    
    setTimeout(() => {
        songCard.remove();
        saveSongLinesToStorage();
        showMessage('Song line removed 🗑️');
    }, 500);
}

// Add new love note
function addNewNote() {
    const notesContainer = document.querySelector('.notes-container');
    const hearts = ['💖', '💕', '💗', '💓', '💝', '🌹', '✨', '🌟'];
    const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
    
    const newNote = document.createElement('div');
    newNote.className = 'love-note sparkle-effect';
    newNote.innerHTML = `
        <div class="note-header">${randomHeart}</div>
        <p class="note-content" contenteditable="true">Write a sweet message here...</p>
        <button class="delete-note-btn" onclick="deleteNote(this)">❌</button>
    `;
    
    // Add entrance animation
    newNote.style.animation = 'bounceIn 0.8s ease-out';
    
    notesContainer.appendChild(newNote);
    
    // Auto-focus on the new note
    setTimeout(() => {
        const noteContent = newNote.querySelector('.note-content');
        noteContent.focus();
        noteContent.select();
    }, 100);
    
    // Setup auto-save for the new note
    const noteContent = newNote.querySelector('.note-content');
    noteContent.addEventListener('blur', saveNotesToStorage);
    
    showMessage('New love note added! 💌');
}

// Delete love note
function deleteNote(button) {
    const note = button.closest('.love-note');
    note.style.animation = 'bounceOut 0.5s ease-in forwards';
    
    setTimeout(() => {
        note.remove();
        saveNotesToStorage();
        showMessage('Love note removed 🗑️');
    }, 500);
}

// Add sparkle effects to cards
function addSparkleEffects() {
    const cards = document.querySelectorAll('.photo-card, .love-note');
    
    cards.forEach(card => {
        if (!card.classList.contains('add-photo-card')) {
            card.classList.add('sparkle-effect');
        }
    });
}

// Show message
function showMessage(text) {
    const message = document.createElement('div');
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #ff6b9d, #ff8e8e);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(255, 107, 157, 0.4);
        z-index: 1000;
        animation: messageSlideIn 0.5s ease-out, messageSlideOut 0.5s ease-in 2.5s forwards;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 3000);
}

// Save and load functionality
function savePhotosToStorage() {
    const photos = [];
    const photoCards = document.querySelectorAll('.photo-card:not(.add-photo-card)');
    
    photoCards.forEach(card => {
        const img = card.querySelector('.uploaded-photo');
        if (img) {
            photos.push(img.src);
        }
    });
    
    localStorage.setItem('galleryPhotos', JSON.stringify(photos));
}

function saveSongLinesToStorage() {
    const songs = [];
    const songCards = document.querySelectorAll('.song-card');
    
    songCards.forEach(card => {
        const icon = card.querySelector('.song-icon').textContent;
        const line = card.querySelector('.song-line').textContent;
        const artist = card.querySelector('.song-artist').textContent;
        
        songs.push({ icon, line, artist });
    });
    
    localStorage.setItem('gallerySongs', JSON.stringify(songs));
}

function saveNotesToStorage() {
    const notes = [];
    const noteCards = document.querySelectorAll('.love-note');
    
    noteCards.forEach(card => {
        const header = card.querySelector('.note-header').textContent;
        const content = card.querySelector('.note-content').textContent;
        
        notes.push({ header, content });
    });
    
    localStorage.setItem('galleryNotes', JSON.stringify(notes));
}

function loadSavedContent() {
    // Load photos
    const savedPhotos = localStorage.getItem('galleryPhotos');
    if (savedPhotos) {
        const photos = JSON.parse(savedPhotos);
        const photoGrid = document.getElementById('photoGrid');
        const addPhotoCard = photoGrid.querySelector('.add-photo-card');
        
        photos.forEach(photoSrc => {
            const photoCard = document.createElement('div');
            photoCard.className = 'photo-card sparkle-effect';
            photoCard.innerHTML = `
                <img src="${photoSrc}" alt="Beautiful Memory" class="uploaded-photo">
                <div class="photo-overlay">
                    <button class="delete-photo-btn" onclick="deletePhoto(this)">🗑️</button>
                </div>
            `;
            
            photoGrid.insertBefore(photoCard, addPhotoCard);
            addPhotoHoverEffects(photoCard);
        });
    }
    
    // Load song lines
    const savedSongs = localStorage.getItem('gallerySongs');
    if (savedSongs) {
        const songs = JSON.parse(savedSongs);
        const songContainer = document.querySelector('.song-container');
        
        // Clear existing songs except the first few default ones
        const existingSongs = songContainer.querySelectorAll('.song-card');
        existingSongs.forEach((song, index) => {
            if (index >= 3) { // Keep first 3 default songs
                song.remove();
            }
        });
        
        // Add saved songs (skip first 3 as they're defaults)
        songs.slice(3).forEach(song => {
            const songCard = document.createElement('div');
            songCard.className = 'song-card';
            songCard.onclick = function() { editSongLine(this); };
            songCard.innerHTML = `
                <div class="song-icon">${song.icon}</div>
                <div class="song-content">
                    <p class="song-line" contenteditable="true">${song.line}</p>
                    <span class="song-artist" contenteditable="true">${song.artist}</span>
                </div>
                <button class="delete-song-btn" onclick="deleteSongCard(this)">❌</button>
            `;
            
            songContainer.appendChild(songCard);
        });
    }
    
    // Load notes
    const savedNotes = localStorage.getItem('galleryNotes');
    if (savedNotes) {
        const notes = JSON.parse(savedNotes);
        const notesContainer = document.querySelector('.notes-container');
        
        // Clear existing notes except the first few default ones
        const existingNotes = notesContainer.querySelectorAll('.love-note');
        existingNotes.forEach((note, index) => {
            if (index >= 3) { // Keep first 3 default notes
                note.remove();
            }
        });
        
        // Add saved notes (skip first 3 as they're defaults)
        notes.slice(3).forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.className = 'love-note sparkle-effect';
            noteCard.innerHTML = `
                <div class="note-header">${note.header}</div>
                <p class="note-content" contenteditable="true">${note.content}</p>
                <button class="delete-note-btn" onclick="deleteNote(this)">❌</button>
            `;
            
            notesContainer.appendChild(noteCard);
            
            // Setup auto-save
            const noteContent = noteCard.querySelector('.note-content');
            noteContent.addEventListener('blur', saveNotesToStorage);
        });
    }
}

function setupAutoSave() {
    // Auto-save song lines
    const songLines = document.querySelectorAll('.song-line, .song-artist');
    songLines.forEach(element => {
        element.addEventListener('blur', saveSongLinesToStorage);
    });
    
    // Auto-save notes
    const noteContents = document.querySelectorAll('.note-content');
    noteContents.forEach(element => {
        element.addEventListener('blur', saveNotesToStorage);
    });
}

// Add CSS animations
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes photoSlideIn {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes photoSlideOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3) translateY(-50px);
        }
        50% {
            opacity: 1;
            transform: scale(1.05) translateY(0);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes bounceOut {
        0% {
            transform: scale(1);
        }
        25% {
            transform: scale(0.95);
        }
        50% {
            opacity: 1;
            transform: scale(1.1);
        }
        100% {
            opacity: 0;
            transform: scale(0.3);
        }
    }
    
    @keyframes messageSlideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes messageSlideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .editing {
        background: rgba(255, 107, 157, 0.1) !important;
        border-left-color: #ff8e8e !important;
    }
    
    .photo-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .photo-card:hover .photo-overlay {
        opacity: 1;
    }
    
    .delete-photo-btn, .delete-song-btn, .delete-note-btn {
        background: #ff4757;
        color: white;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.3s ease;
        position: absolute;
        top: 10px;
        right: 10px;
    }
    
    .delete-photo-btn:hover, .delete-song-btn:hover, .delete-note-btn:hover {
        background: #ff3742;
        transform: scale(1.1);
    }
    
    .song-card, .love-note {
        position: relative;
    }
    
    .delete-song-btn, .delete-note-btn {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .song-card:hover .delete-song-btn,
    .love-note:hover .delete-note-btn {
        opacity: 1;
    }
`;
document.head.appendChild(animationStyle);
