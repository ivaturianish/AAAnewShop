import mongoose from "mongoose"
import env from "dotenv"
env.config()
/**
 * Connect to MongoDB database
 *
 * To use this in a production environment:
 * 1. Create a .env file in the root directory
 * 2. Add MONGO_URI=your_mongodb_connection_string to the .env file
 * 3. Make sure to add .env to your .gitignore file
 *
 * Example connection string:
 * mongodb+srv://username:password@cluster.mongodb.net/shopmern?retryWrites=true&w=majority
 */
const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/my-default-db"
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB

