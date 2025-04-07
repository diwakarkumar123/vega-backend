// #!/usr/bin/env node
// import app from '../src/app';
// import http from 'http';

// const port = process.env.PORT || 3000;
// const server = http.createServer(app);


// server.listen(port, () => {
//   console.log(`🚀 Server running on http://localhost:${port}`);
// });
// #!/usr/bin/env node

import app from '../src/app';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

function normalizePort(val: string | number): number | string | false {
  const port = typeof val === 'string' ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

const server = http.createServer(app);

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;

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
function onListening(): void {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? "pipe " + addr : "port " + (addr?.port || "");
    console.log("Listening on " + bind);
    console.log(`🚀 Server running on http://localhost:${bind}`);

  }
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
