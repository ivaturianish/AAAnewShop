import express from "express"
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

// @route   POST /api/users
// @desc    Register a new user
// @access  Public
router.route("/").post(registerUser)

// @route   GET /api/users
// @desc    Get all users
// @access  Private/Admin
router.route("/").get(protect, admin, getUsers)

// @route   POST /api/users/login
// @desc    Auth user & get token
// @access  Public
router.post("/login", authUser)

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.route("/profile").get(protect, getUserProfile)

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.route("/profile").put(protect, updateUserProfile)

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private/Admin
router.route("/:id").delete(protect, admin, deleteUser)

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private/Admin
router.route("/:id").get(protect, admin, getUserById)

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private/Admin
router.route("/:id").put(protect, admin, updateUser)

export default router

