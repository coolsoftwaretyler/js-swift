const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/script.js') {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/javascript');
        
        // Read and serve the JavaScript file
        fs.readFile(path.join(__dirname, 'index.js'), 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error loading index.js');
                return;
            }
            res.end(data);
        });
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

// Watch for file changes
fs.watch(path.join(__dirname, 'index.js'), (eventType, filename) => {
    if (eventType === 'change') {
        console.log('index.js changed:', new Date().toLocaleTimeString());
    }
}); 