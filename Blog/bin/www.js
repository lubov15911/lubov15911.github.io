const app = require('../src/js/app');
const http = require('http');

const PORT = 3000;

app.set('port', PORT);

const server = http.createServer(app);
server.listen(PORT);
