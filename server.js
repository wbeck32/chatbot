const http = require('http');
const fs = require('fs');
const port = 80;

http.createServer(function (req, res) {

    fs.readFile('index.html', function (err, data) {
        if (err) {
            res.statusCode = 500;
            res.end(`Error getting the file: ${err}.`);
        } else {
            res.setHeader('Content-type', 'text/html' || 'text/plain');
            res.end(data);
        }
    });
}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);