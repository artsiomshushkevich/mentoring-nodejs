const http = require('http');
const fs = require('fs');
const path = require('path');
const through = require('through2');

const htmlServer = http.createServer();
const htmlFilePath = path.resolve('./server/src/http-servers/data/index.html');
const message = 'Any messsage';

function sendStaticContent(res) {
    const htmlFile = fs.readFileSync(htmlFilePath);
    const htmlFileContent = htmlFile.toString().replace('{message}', message);

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(htmlFileContent);
}

function sendStream(res) {
    const reader = fs.createReadStream(htmlFilePath);
    const transformCallback = (chunk, encoding, callback) => {
        let transformedChunk = chunk.toString().replace('{message}', message);
        callback(null, transformedChunk);
    };
    
    reader.pipe(through(transformCallback)).pipe(res);
}

htmlServer.on('request', (req, res) => {
    switch (req.url) {
        case '/stream': 
            sendStream(res);
            break;
        case '/static':
            sendStaticContent(res);
            break;
        default:
            sendStaticContent(res);
    }
});

htmlServer.listen(3000);
