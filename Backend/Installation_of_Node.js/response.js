const http = require('http');

// Create a server
const server = http.createServer((req, res)=>{
    if(req.url === '/home'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Welcome home');
    } else if(req.url === '/aboout'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Welcome to about page');
    } else if(req.url === '/node'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Welcome to my Node Js project');
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('404 Page not found');
    }
});

// Start the server on port 3000
server.listen(3000, ()=>{
    console.log('Server is running on http://localhost:3000');
});