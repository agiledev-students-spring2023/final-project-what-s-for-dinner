// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const path = require("path");
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// import and use the recipe and ingredients routes
const recipeRouter = require('./routes/recipes');
const ingredientsRouter = require('./routes/ingredients');
app.use('/recipes-api', recipeRouter);
app.use('/ingredients-api', ingredientsRouter);

// import some useful middleware
const multer = require("multer"); // middleware to handle HTTP POST requests with file uploads
const axios = require("axios"); // middleware for making requests to APIs
require("dotenv").config({ silent: true }); // load environmental variables from a hidden file named .env

const morgan = require("morgan"); // middleware for nice logging of incoming HTTP requests

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
app.use("/static", express.static("public"));

app.listen(3001, () => {
  console.log('Server is listening on port 3001');
});

module.exports = app;