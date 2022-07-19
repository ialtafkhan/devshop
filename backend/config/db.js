const mongoose = require("mongoose");
require("colors");

const db = async (e) => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`DB CONNECTED`.bgGreen);
  } catch (error) {
    console.log(`CONNECTION ERROR ${error}`.bgRed);
    process.exit()
  }
};

module.exports = db
