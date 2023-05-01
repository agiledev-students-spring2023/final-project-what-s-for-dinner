// back-end/db.js
const mongoose = require("mongoose");

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`Connected to MongoDB.`);
  } catch (err) {
    console.error(`Error connecting to MongoDB:`, err);
  }
}

module.exports = connectToMongoDB;