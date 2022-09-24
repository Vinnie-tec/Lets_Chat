const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected: ' + (connect.connection.host).blue.bold)
  } catch (error) {
    console.log('Error: ' + (error.message).red.bold)
    process.exit();
  }
}

module.exports = connectDB;