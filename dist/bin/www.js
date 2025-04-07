"use strict";
// #!/usr/bin/env node
// import app from '../src/app';
// import http from 'http';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const port = process.env.PORT || 3000;
// const server = http.createServer(app);
// server.listen(port, () => {
//   console.log(`🚀 Server running on http://localhost:${port}`);
// });
// #!/usr/bin/env node
const app_1 = __importDefault(require("../src/app"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function normalizePort(val) {
    const port = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    if (port >= 0)
        return port;
    return false;
}
const port = normalizePort(process.env.PORT || 3000);
app_1.default.set('port', port);
const server = http_1.default.createServer(app_1.default);
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
}
// function onListening(): void {
//   const addr = server.address();
//   const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
//   console.log(`🚀 Server running at http://localhost:${bind}`);
// }
function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + ((addr === null || addr === void 0 ? void 0 : addr.port) || "");
    console.log("Listening on " + bind);
    console.log(`🚀 Server running on http://localhost:${bind}`);
}
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
