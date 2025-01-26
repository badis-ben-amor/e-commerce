const mongoose = require("mongoose");

const connection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connection;
