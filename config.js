const config = {
    DB_URL: process.env.DB_URL || "mongodb://localhost:27017/solid-arch",
    PORT: process.env.PORT || 3002,
  };
  
  module.exports = config;