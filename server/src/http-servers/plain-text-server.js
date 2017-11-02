const http = require('http');

const plainTextServer = http.createServer();

plainTextServer.on('request', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Hello world');
});

plainTextServer.listen(3000);