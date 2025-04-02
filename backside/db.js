
const mongoose = require('mongoose');

const uri = "mongodb+srv://priyanshumaheshwari704:admin%40123@cluster0.qjoqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(uri, {
      useNewUrlParser: true, // Set this to true
      useUnifiedTopology: true, // Set this to true
    });
    console.log(`MongoDB connected:"Successfully connected to mongo" ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;