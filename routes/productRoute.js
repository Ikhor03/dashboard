import express from "express";
import {
    getProduct,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
} from "../controllers/product.js";

const router = express.Router();

router.get('/product', getProduct);
router.get('/product/:id', getProductById);
router.post('/product', createProduct);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

export default router;