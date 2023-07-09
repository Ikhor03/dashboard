import express from "express";
import {
    getProduct,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
} from "../controllers/product.js";
import {verifyUser, adminOnly} from "../middleware/authUser.js"

const router = express.Router();

router.get('/product', verifyUser, getProduct);
router.get('/product/:id', verifyUser, getProductById);
router.post('/product', verifyUser, createProduct);
router.put('/product/:id', verifyUser, updateProduct);
router.delete('/product/:id', verifyUser, deleteProduct);

export default router;