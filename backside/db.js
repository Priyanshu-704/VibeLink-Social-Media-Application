

const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/socialmedia", {
      // Options are now default in Mongoose 6+
      // useNewUrlParser: true,    // No longer needed
      // useUnifiedTopology: true // No longer needed
    });
    
    console.log(`MongoDB Connected: ${connection.connection.host}`);

    // Additional connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
