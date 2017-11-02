const http = require('http');

const jsonServer = http.createServer();

jsonServer.on('request', (req, res) => {
    const product = { 
        id: 1, 
        name: 'Supreme T-Shirt', 
        brand: 'Supreme', 
        price: 99.99, 
        options: [ 
            {color: 'blue'}, 
            {size: 'XL'} 
        ] 
    };
 
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(product));
});

jsonServer.listen(3000);
