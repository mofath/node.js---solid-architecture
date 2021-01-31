const mongoose = require("mongoose");
const config = require("../config");

const DB_URL = config.DB_URL;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

class DBManager {
  constructor() {
    if (!DBManager.instance) {
      this._conn = mongoose.connection;
      DBManager.instance = this;
    }
    return DBManager.instance;
  }

  CONNECT() {
    console.log("connecting to db...");
    mongoose.connect(DB_URL, options);
    return this._conn;
  }
}

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connected error " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

module.exports = DBManager;
