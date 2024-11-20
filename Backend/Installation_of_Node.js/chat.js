const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

// Path to the file where the message will be stored
const filePath = path.join(__dirname, 'message.txt');

// Function to read the latest message from the file
function getLatestMessage() {
    if (!fs.existsSync(filePath)) {
        return 'No messages yet!';
    }
    return fs.readFileSync(filePath, 'utf8').trim() || 'No messages yet!';
}

// Function to save a new message to the file
function saveMessage(message) {
    fs.writeFileSync(filePath, message);
}

// Create the server
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        // Serve the form and the latest message
        const latestMessage = getLatestMessage();
        const html = `
            <html>
                <head>
                    <title>Single Message Display</title>
                </head>
                <body>
                    <h1>Latest Message</h1>
                    <p>${latestMessage}</p>
                    <form method="POST" action="/">
                        <input type="text" name="message" placeholder="Enter your message" required>
                        <button type="submit">Send Message</button>
                    </form>
                </body>
            </html>
        `;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } else if (req.method === 'POST') {
        // Handle form submission
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { message } = querystring.parse(body);
            if (message) {
                saveMessage(message); // Save the new message, replacing the old one
            }
            res.writeHead(302, { Location: '/' });
            res.end();
        });
    }
});

// Start the server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
