const http = require('http');

const server = http.createServer((req, res) => {
    res.write('My name is Rahul Kumar');
    res.end();
});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});

