import express from "express"
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.route("/").post(protect, addOrderItems)

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private/Admin
router.route("/").get(protect, admin, getOrders)

// @route   GET /api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
router.route("/myorders").get(protect, getMyOrders)

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.route("/:id").get(protect, getOrderById)

// @route   PUT /api/orders/:id/pay
// @desc    Update order to paid
// @access  Private
router.route("/:id/pay").put(protect, updateOrderToPaid)

// @route   PUT /api/orders/:id/deliver
// @desc    Update order to delivered
// @access  Private/Admin
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered)

export default router

