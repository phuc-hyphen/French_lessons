// Configuration - CHANGE THIS TO YOUR EMAIL
const RECIPIENT_EMAIL = 'your-email@example.com'; // ← Change this to your email!

const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const dateForm = document.getElementById('dateForm');
const noEmoji = document.getElementById('noEmoji');
const continueEmoji = document.getElementById('continueEmoji');

// Array of scared/nervous emojis
const emojis = ['😰', '😱', '😨', '😧', '😦', '🏃', '💨', '😵', '😖', '😣', '🙈', '😬', '🫣', '😳'];

let formData = {};

// Page 1: Make the No button tremble and run away
// Track mouse movement to detect proximity
document.addEventListener('mousemove', (e) => {
    if (document.getElementById('page1').classList.contains('active')) {
        const rect = noBtn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate distance from mouse to button center
        const distance = Math.sqrt(
            Math.pow(mouseX - btnCenterX, 2) +
            Math.pow(mouseY - btnCenterY, 2)
        );

        // Tremble when mouse is within 100px
        if (distance < 100) {
            noBtn.classList.add('shake');
        } else {
            noBtn.classList.remove('shake');
        }

        // Run away when mouse is within 50px
        if (distance < 50) {
            runAway();
        }
    }
});

function runAway() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Change emoji to a random one
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    noEmoji.textContent = randomEmoji;
}

noBtn.addEventListener('mouseenter', () => {
    runAway();
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    runAway();
});

// Initialize No button position
noBtn.style.left = '50%';
noBtn.style.top = '50%';

// Yes button - go to page 2
yesBtn.addEventListener('click', () => {
    showPage('page2');
    document.body.style.overflow = 'auto';
});

// Page 2: Add happy emoji on hover
dateForm.querySelector('.submit-btn').addEventListener('mouseenter', () => {
    continueEmoji.textContent = '😊';
});

dateForm.querySelector('.submit-btn').addEventListener('mouseleave', () => {
    continueEmoji.textContent = '';
});

// Page 2: Form submission
dateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    formData = {
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        place: document.getElementById('place').value
    };

    // Format date nicely
    const dateObj = new Date(formData.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Format time nicely
    const [hours, minutes] = formData.time.split(':');
    const timeObj = new Date();
    timeObj.setHours(hours, minutes);
    const formattedTime = timeObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    // Update confirmation page
    document.getElementById('confirmDate').textContent = formattedDate;
    document.getElementById('confirmTime').textContent = formattedTime;
    document.getElementById('confirmPlace').textContent = formData.place;

    showPage('page3');

    // Automatically send email when page 3 is shown
    sendEmail();
});

// Function to send email automatically
function sendEmail() {
    // Format date for email
    const dateObj = new Date(formData.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Format time for email
    const [hours, minutes] = formData.time.split(':');
    const timeObj = new Date();
    timeObj.setHours(hours, minutes);
    const formattedTime = timeObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    const subject = encodeURIComponent('She said YES!! 💖🎉');
    const body = encodeURIComponent(
        `🎊 SHE SAID YES!! 🎊\n\n` +
        `Great news! She agreed to go on a date!\n\n` +
        `📅 Date: ${formattedDate}\n` +
        `⏰ Time: ${formattedTime}\n` +
        `📍 Place: ${formData.place}\n\n` +
        `Can't wait! 💖✨`
    );

    // Open email client with pre-filled information
    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
}

// Helper function to switch pages
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}
