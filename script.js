// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    // Add some interactive sparkle effects
    createFloatingHearts();
    
    // Add click effects to petals
    addPetalClickEffects();
    
    // Add background music trigger (optional)
    setupAudioContext();
    
    // Setup photo upload functionality
    setupPhotoUpload();
});

// Function to trigger the bloom animation again
function triggerBloom() {
    const flowerContainer = document.querySelector('.flower-container');
    const button = document.querySelector('.bloom-button');
    
    // Add replay class to trigger re-bloom animation
    flowerContainer.classList.add('replay');
    
    // Create burst of hearts
    createHeartBurst();
    
    // Play a gentle sound effect
    playBloomSound();
    
    // Button feedback
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    // Remove replay class after animation
    setTimeout(() => {
        flowerContainer.classList.remove('replay');
    }, 2000);
}

// Create floating hearts effect
function createFloatingHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'floating-hearts';
    heartsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    document.body.appendChild(heartsContainer);
    
    // Create hearts periodically
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
            createHeart(heartsContainer);
        }
    }, 3000);
}

// Create individual floating heart
function createHeart(container) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 20 + 15}px;
        left: ${Math.random() * 100}%;
        top: 100%;
        opacity: 0.7;
        animation: floatUp ${Math.random() * 3 + 4}s ease-out forwards;
        pointer-events: none;
    `;
    
    container.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 7000);
}

// Add CSS for floating hearts animation
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartStyle);

// Create heart burst effect
function createHeartBurst() {
    const flower = document.querySelector('.flower');
    const rect = flower.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 20px;
            pointer-events: none;
            z-index: 1000;
            animation: heartBurst 2s ease-out forwards;
            transform-origin: center;
        `;
        
        // Set random direction for each heart
        const angle = (360 / 8) * i;
        heart.style.setProperty('--angle', `${angle}deg`);
        
        document.body.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 2000);
    }
}

// Add heart burst animation CSS
const burstStyle = document.createElement('style');
burstStyle.textContent = `
    @keyframes heartBurst {
        0% {
            transform: rotate(var(--angle)) translateX(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: rotate(var(--angle)) translateX(100px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(burstStyle);

// Add click effects to petals
function addPetalClickEffects() {
    const petals = document.querySelectorAll('.petal');
    
    petals.forEach((petal, index) => {
        petal.style.cursor = 'pointer';
        petal.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                left: ${e.offsetX}px;
                top: ${e.offsetY}px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            // Petal wiggle effect
            this.style.animation = 'petalWiggle 0.5s ease-in-out';
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
                this.style.animation = '';
            }, 600);
        });
    });
}

// Add ripple and wiggle animations
const interactionStyle = document.createElement('style');
interactionStyle.textContent = `
    @keyframes ripple {
        0% {
            width: 10px;
            height: 10px;
            opacity: 1;
        }
        100% {
            width: 50px;
            height: 50px;
            opacity: 0;
        }
    }
    
    @keyframes petalWiggle {
        0%, 100% { transform: rotate(0deg) scale(1); }
        25% { transform: rotate(-5deg) scale(1.05); }
        75% { transform: rotate(5deg) scale(1.05); }
    }
`;
document.head.appendChild(interactionStyle);

// Setup audio context for sound effects
function setupAudioContext() {
    // Create audio context for web audio API
    window.audioContext = null;
    
    // Initialize on first user interaction
    document.addEventListener('click', function initAudio() {
        if (!window.audioContext) {
            window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        document.removeEventListener('click', initAudio);
    }, { once: true });
}

// Play bloom sound effect
function playBloomSound() {
    if (!window.audioContext) return;
    
    // Create a gentle chime sound
    const oscillator = window.audioContext.createOscillator();
    const gainNode = window.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(window.audioContext.destination);
    
    // Configure the sound
    oscillator.frequency.setValueAtTime(523.25, window.audioContext.currentTime); // C5
    oscillator.frequency.exponentialRampToValueAtTime(659.25, window.audioContext.currentTime + 0.1); // E5
    oscillator.frequency.exponentialRampToValueAtTime(783.99, window.audioContext.currentTime + 0.2); // G5
    
    gainNode.gain.setValueAtTime(0, window.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, window.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 0.5);
    
    oscillator.start(window.audioContext.currentTime);
    oscillator.stop(window.audioContext.currentTime + 0.5);
}

// Add some romantic messages that appear randomly
const romanticMessages = [
    "You make my heart bloom 🌸",
    "Like this flower, my love grows for you 💕",
    "You're the sunshine to my petals ☀️",
    "Every day with you is like spring 🌺",
    "You're blooming beautiful 🌹"
];

// Show random message on flower click
document.addEventListener('DOMContentLoaded', function() {
    const flower = document.querySelector('.flower');
    
    flower.addEventListener('click', function() {
        showRomanticMessage();
    });
});

function showRomanticMessage() {
    const message = romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
    
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        color: #FF6B9D;
        padding: 20px 30px;
        border-radius: 25px;
        font-size: 1.2rem;
        font-weight: bold;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: messagePopup 3s ease-in-out forwards;
        text-align: center;
        border: 2px solid #FF6B9D;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}

// Add message popup animation
const messageStyle = document.createElement('style');
messageStyle.textContent = `
    @keyframes messagePopup {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
        }
        25% {
            transform: translate(-50%, -50%) scale(1);
        }
        90% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(messageStyle);

// Setup photo upload functionality
function setupPhotoUpload() {
    const photoInput = document.getElementById('photoInput');
    const crushPhoto = document.getElementById('crushPhoto');
    const photoPlaceholder = document.querySelector('.photo-placeholder');
    
    photoInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                crushPhoto.src = e.target.result;
                crushPhoto.style.display = 'block';
                photoPlaceholder.style.display = 'none';
                
                // Add a beautiful entrance animation for the photo
                crushPhoto.style.animation = 'photoAppear 1s ease-out';
                
                // Show a sweet message
                setTimeout(() => {
                    showRomanticMessage('She looks absolutely beautiful! 😍💕');
                }, 500);
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Add photo appearance animation
    const photoStyle = document.createElement('style');
    photoStyle.textContent = `
        @keyframes photoAppear {
            0% {
                opacity: 0;
                transform: scale(0) rotate(180deg);
            }
            50% {
                opacity: 0.8;
                transform: scale(1.1) rotate(0deg);
            }
            100% {
                opacity: 1;
                transform: scale(1) rotate(0deg);
            }
        }
        
        .crush-photo {
            transition: all 0.3s ease;
        }
        
        .crush-photo:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(255, 107, 157, 0.6);
        }
    `;
    document.head.appendChild(photoStyle);
}

// Function to change photo (can be called to update the photo)
function changePhoto() {
    document.getElementById('photoInput').click();
}

// Add double-click to change photo
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const crushPhoto = document.getElementById('crushPhoto');
        if (crushPhoto) {
            crushPhoto.addEventListener('dblclick', function() {
                changePhoto();
            });
        }
    }, 1000);
});
