import express from "express";
import {
    getUser,
    getUserById,
    createUser,
    deleteUser,
    updateUser
} from "../controllers/user.js";
import {verifyUser, adminOnly} from "../middleware/authUser.js";

const router = express.Router();

router.get('/user', verifyUser, adminOnly, getUser);
router.get('/user/:id', verifyUser, adminOnly, getUserById);
router.post('/user', createUser);
router.put('/user/:id', verifyUser, adminOnly, updateUser);
router.delete('/user/:id', verifyUser, adminOnly, deleteUser);

export default router;