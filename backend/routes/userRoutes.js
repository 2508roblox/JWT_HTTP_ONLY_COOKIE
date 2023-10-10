import express from "express";
import { authUser, getUserProfile, logout, regiserUser, updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/auth', authUser)
router.post('/', regiserUser)
router.post('/logout', logout)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
export default router;