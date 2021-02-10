const winston = require("winston");
var path = require("path");

const { createLogger, format, transports } = winston;
const { combine, timestamp, colorize, align, printf } = format;

// Set this to whatever, by default the path of the script.
const logPath = path.join(__dirname, "./logs");

const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    sql: 4,
    debug: 5,
  },
  colors: {
    error: "red",
    warn: "darkred",
    info: "black",
    http: "green",
    sql: "blue",
    debug: "gray",
  },
};

winston.addColors(logLevels);

const myFormat = printf((info) => {
  const { timestamp, level, message, label, ...args } = info;
  const ts = timestamp.slice(0, 19).replace("T", " ");
  return `${ts} ${label} [${level}]: ${message} ${
    Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
  }`;
});

var options = {
  console: {
    handleExceptions: true,
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: combine(
      colorize(),
      align(),
      timestamp(),
      format.json(),
      format.label({ label: path.basename(process.mainModule.filename) }),
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      myFormat
    ),
  },
  access: {
    filename: path.join(logPath, "access.log"),
    level: "info",
    format: combine(
      align(),
      timestamp(),
      format.json(),
      format.label({ label: path.basename(process.mainModule.filename) }),
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      myFormat
    ),
  },
  error: {
    filename: path.join(logPath, "errors.log"),
    level: "error",
    format: combine(
      align(),
      timestamp(),
      format.json(),
      format.label({ label: path.basename(process.mainModule.filename) }),
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      myFormat
    ),
  },
};

const errorLog = createLogger({
  transports: [
    new transports.File(options.error),
    new transports.Console(options.console),
  ],
});

const accessLog = createLogger({
  transports: [
    new transports.File(options.access),
    new transports.Console(options.console),
  ],
});

module.exports = {
  errorLog: errorLog,
  accessLog: accessLog,
};
