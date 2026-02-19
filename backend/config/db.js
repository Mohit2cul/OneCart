import mongoose from "mongoose";

const DEFAULT_RETRIES = 5;
const DEFAULT_TIMEOUT = 5000; // ms

const connectDB = async (uri = process.env.MONGODB_URI, retries = DEFAULT_RETRIES) => {
  if (!uri) {
    console.error('MONGODB_URI is not set in environment. Please set it in backend/.env');
    process.exit(1);
  }

  const opts = {
    // keep modern defaults; serverSelectionTimeout helps fail faster
    serverSelectionTimeoutMS: DEFAULT_TIMEOUT,
    // mongoose v7 uses these by default but keeping for clarity
    // if using older driver these are useful
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempting MongoDB connection (${attempt}/${retries})...`);
      await mongoose.connect(uri, opts);
      console.log("MongoDB connected");
      return;
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt} failed:`, error && error.message ? error.message : error);
      if (attempt < retries) {
        const backoff = 500 * attempt; // simple backoff: 500ms * attempt
        console.log(`Waiting ${backoff}ms before next attempt...`);
        await new Promise((res) => setTimeout(res, backoff));
        continue;
      }

      // After final failure, print actionable advice and exit
      console.error('MongoDB connection failed after multiple attempts. Check the following:');
      console.error('- Is your internet connection stable?');
      console.error('- Is the connection string in backend/.env correct?');
      console.error('- If using MongoDB Atlas, ensure your cluster allows connections from your IP (Network Access) or 0.0.0.0/0 for testing.');
      console.error('- Verify username/password and database name in the URI.');
      console.error('- If your Atlas cluster requires TLS, ensure your environment permits TLS connections.');
      console.error('Final error:', error);
      process.exit(1);
    }
  }
};

export default connectDB;
