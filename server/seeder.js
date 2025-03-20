import dotenv from "dotenv"
import users from "./data/users.js"
import products from "./data/products.js"
import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"
import connectDB from "./config/db.js"

dotenv.config()

connectDB()

// Import data into database
const importData = async () => {
  try {
    // Clear all existing data
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // Insert users
    const createdUsers = await User.insertMany(users)

    // Get admin user
    const adminUser = createdUsers[0]._id

    // Add admin user to all products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    // Insert products
    await Product.insertMany(sampleProducts)

    console.log("Data Imported!".green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// Delete all data from database
const destroyData = async () => {
  try {
    // Clear all existing data
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log("Data Destroyed!".red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// If -d flag is passed, destroy data, otherwise import data
if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}

