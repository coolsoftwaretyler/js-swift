const http = require('http');
const esbuild = require('esbuild');
const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const PORT = 3000;

// Function to compile TypeScript
async function compileTypeScript() {
    try {
        await execAsync('npx tsc');
        console.log('TypeScript compilation successful');
        return true;
    } catch (error) {
        console.error('TypeScript compilation error:', error.stderr);
        return false;
    }
}

// Function to bundle the code
async function bundle() {
    try {
        // First compile TypeScript
        const tsSuccess = await compileTypeScript();
        if (!tsSuccess) {
            throw new Error('TypeScript compilation failed');
        }

        // Then bundle with esbuild
        const result = await esbuild.build({
            entryPoints: ['./dist/index.js'],
            bundle: true,
            format: 'iife',
            target: 'es2020',
            outfile: './index.js',
            sourcemap: true,
            platform: 'browser',
            globalName: 'SwiftJSBridge'
        });
        console.log('Bundle successful');
        return true;
    } catch (error) {
        console.error('Bundling error:', error);
        return false;
    }
}

// Initial bundle
bundle();

const server = http.createServer(async (req, res) => {
    if (req.url === '/script.js') {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', 'no-cache');
        
        // Rebuild bundle and serve it
        const success = await bundle();
        if (!success) {
            res.statusCode = 500;
            res.end('Error bundling JavaScript');
            return;
        }

        // Read and serve the bundled file
        const bundledCode = fs.readFileSync('./index.js', 'utf8');
        res.end(bundledCode);
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/script.js`);
});
