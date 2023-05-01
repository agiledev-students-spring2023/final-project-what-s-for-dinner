#!/usr/bin/env node
require("dotenv").config({ silent: true });
const server = require("./app"); // load up the web server
const morgan = require("morgan");
const port = 3000; // the port to listen to for incoming requests
const connectToMongoDB = require("./db");

server.use(morgan("dev")); // Add this line to enable morgan middleware for logging

connectToMongoDB()
  .then(() => {
    // Start the server after the connection to MongoDB is established
    const listener = server.listen(port, function () {
      console.log(`Server running on port: ${port}`);
    });

    // A function to stop listening to the port
    const close = () => {
      listener.close();
    };

    module.exports = {
      close: close,
    };
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
