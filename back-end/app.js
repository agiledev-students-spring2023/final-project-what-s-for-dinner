// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const path = require("path");
const cookieParser = require("cookie-parser") // middleware useful for parsing cookies in requests
const cors = require('cors');
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
app.use(express.static('static'));
app.use('../static/images', express.static(path.join(__dirname, 'front-end/static/images')));
app.use(express.static(path.join(__dirname, 'public')));

// the following are used for authentication with JSON Web Tokens
const _ = require("lodash") // the lodash module has some convenience functions for arrays that we use to sift through our mock user data... you don't need this if using a real database with user info
const jwt = require("jsonwebtoken")
const passport = require("passport")

// use this JWT strategy within passport for authentication handling
const jwtStrategy = require("./config/jwt-config.js") // import setup options for using JWT in passport
passport.use(jwtStrategy)

// tell express to use passport middleware
app.use(passport.initialize())

// mongoose models for MongoDB data manipulation
const User = require("./models/users.js")

const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


// import and use the recipe and ingredients routes
const recipeRouter = require('./routes/recipes');
const ingredientsRouter = require('./routes/ingredients');
const utensilsRouter = require('./routes/utensils');
const uploadrecipeRouter = require('./routes/upload-recipe');
const authenticationRouter = require('./routes/authentication');
const cookieRouter = require('./routes/cookie');
const protectedContentRouter = require('./routes/protected-content');
const resetPasswordRouter = require('./routes/reset-password.js');
const savedRecipesRouter = require('./routes/saved-recipes');

// import some useful middleware
const multer = require("multer"); // middleware to handle HTTP POST requests with file uploads
require("dotenv").config({ silent: true })
const axios = require("axios"); // middleware for making requests to APIs
require("dotenv").config({ silent: true }); // load environmental variables from a hidden file named .env

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data
app.use(cookieParser()) // useful middleware for dealing with cookies

// make 'public' directory publicly readable with static content
app.use("/static", express.static("public"));

// enable file uploads saved to disk in a directory named 'public/uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads")
  },
  filename: function (req, file, cb) {
    // take apart the uploaded file's name so we can create a new one based on it
    const extension = path.extname(file.originalname)
    const basenameWithoutExtension = path.basename(file.originalname, extension)
    // create a new filename with a timestamp in the middle
    const newName = `${basenameWithoutExtension}-${Date.now()}${extension}`
    // tell multer to use this new filename for the uploaded file
    cb(null, newName)
  },
})
const upload = multer({ storage: storage })
app.use(recipeRouter);
app.use("/ingredients", ingredientsRouter);
app.use(utensilsRouter);
app.use(uploadrecipeRouter);
app.use("/auth", authenticationRouter()); // all requests for /auth/* will be handled by the authenticationRoutes router
app.use("/cookie", cookieRouter()); // all requests for /cookie/* will be handled by the cookieRoutes router
app.use("/protected", protectedContentRouter()); // all requests for /protected/* will be handled by the protectedRoutes router
app.use(resetPasswordRouter);
app.use(savedRecipesRouter);

module.exports = app;