import http from 'http';
import fs from 'fs';
import path from 'path';

const htmlServer = http.createServer();

htmlServer.on('request', (req, res) => {
    const htmlFile = fs.readFileSync(path.resolve('./src/http-servers/data/index.html'));
    const htmlFileContent = htmlFile.toString().replace('{message}', 'Any message');

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(htmlFileContent);
});

htmlServer.listen(3000);
