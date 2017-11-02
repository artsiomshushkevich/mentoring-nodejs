import http from 'http';

const echoServer = http.createServer();

echoServer.on('request', (req, res) => {
    req.pipe(res);
});

echoServer.listen(3000);