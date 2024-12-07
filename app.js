const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper function to safely read JSON
const safeReadFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            return data.trim() ? JSON.parse(data) : [];
        }
        return [];
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
};

// Serve the index.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API to save messages
app.post('/send-message', (req, res) => {
    const { username, message } = req.body;
    if (!username || !message) {
        return res.status(400).send('Username and message are required.');
    }

    const filePath = path.join(__dirname, 'messages.json');
    const messages = safeReadFile(filePath);

    // Add the new message
    messages.push({ username, message });

    // Save back to the file
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
    res.send({ success: true });
});

// API to get messages
app.get('/messages', (req, res) => {
    const filePath = path.join(__dirname, 'messages.json');
    const messages = safeReadFile(filePath);
    res.json(messages);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
