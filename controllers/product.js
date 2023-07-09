import Products from "../models/productModel.js";

export const getProduct = async (req, res) => {
    try {
        const data = await Products.findAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getProductById = async (req, res) => {
    try {
        const data = await Products.findOne({
            where : {uuid : req.params.id}
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createProduct = async (req, res) => {
    
    try {
        const data = await Products.create();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = (req, res) => {

}

export const deleteProduct = (req, res) => {

}