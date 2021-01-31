const http = require("http");
const dotEnv = require("dotenv");
const app = require("./app");
const DBManager = require("./database/DBManager");

dotEnv.config();

/**
 * Get port from environment and store in Express.
 */

const PORT = process.env.PORT || 3000;
app.set("port", PORT);

const server = http.createServer(app);

const db = new DBManager().CONNECT();
db.once("open", (err) => {
  if (err) console.log("Database connection failure");
  else {
    console.log("Database connection is opened");
    server.listen(PORT);
  }
});

server.on("error", onError);
server.on("listening", onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;
  console.log(bind);

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}
