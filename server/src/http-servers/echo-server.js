const http = require('http');

const echoServer = http.createServer();

echoServer.on('request', (req, res) => {
    req.pipe(res);
});

echoServer.listen(3000);