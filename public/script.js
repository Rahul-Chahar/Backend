// Redirects user based on login status
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    if (username) {
        showChatForm();
    }
});

// Login function
function login() {
    const username = document.getElementById('username').value;
    if (!username) {
        alert('Please enter a username');
        return;
    }

    localStorage.setItem('username', username);
    showChatForm();
}

// Show chat form
function showChatForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('chat-form').style.display = 'block';
    fetchMessages();
}

// Send message
function sendMessage() {
    const message = document.getElementById('message').value;
    const username = localStorage.getItem('username');

    if (!message) {
        alert('Please enter a message');
        return;
    }

    fetch('/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, message }),
    }).then((res) => {
        if (res.ok) {
            fetchMessages();
            document.getElementById('message').value = '';
        }
    });
}

// Fetch messages and display
function fetchMessages() {
    fetch('/messages')
        .then((res) => res.json())
        .then((messages) => {
            const messagesList = document.getElementById('messages');
            messagesList.innerHTML = '';
            messages.forEach(({ username, message }) => {
                const li = document.createElement('li');
                li.textContent = `${username}: ${message}`;
                messagesList.appendChild(li);
            });
        });
}