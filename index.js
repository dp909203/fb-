const app = require('./src/app')
const config = require('./src/config/config');
const db = require('./src/config/db.config')
let server;

if (config.protocol === 'https') {
    const https = require('https');
    server = https.createServer(
        {
            key: fs.readFileSync(config.certificates.privkey, 'utf8'),
            cert: fs.readFileSync(config.certificates.fullchain, 'utf8')
        },
        app
    );
} else {
    const http = require('http');
    server = http.createServer(app);
}

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});