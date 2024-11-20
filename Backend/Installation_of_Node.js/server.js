const http = require('http');

const server = http.createServer((req, res) => {
    res.write('My name is Rahul Kumar');
    res.end();
});

const port = 4000;
server.listen(port, () => {
    console.log('Server is running on port 4000');
});

