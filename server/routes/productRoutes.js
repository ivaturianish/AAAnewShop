import express from "express"
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from "../controllers/productController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

// @route   GET /api/products
// @desc    Fetch all products
// @access  Public
router.route("/").get(getProducts)

// @route   POST /api/products
// @desc    Create a product
// @access  Private/Admin
router.route("/").post(protect, admin, createProduct)

// @route   GET /api/products/:id
// @desc    Fetch single product
// @access  Public
router.route("/:id").get(getProductById)

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.route("/:id").put(protect, admin, updateProduct)

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.route("/:id").delete(protect, admin, deleteProduct)

// @route   POST /api/products/:id/reviews
// @desc    Create new review
// @access  Private
router.route("/:id/reviews").post(protect, createProductReview)

export default router

