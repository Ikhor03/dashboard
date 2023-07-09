import Products from "../models/productModel.js";
import Users from "../models/userModel.js";
import {errorMessage} from "../utils/utils.js";

export const getProduct = async (req, res) => {
    try {
        let data;
        if (req.role === "admin") {
            data = await Users.findAll({
                include : [{
                    model : Users,
                    attributes : ['name', 'price']
                }]
            })
        } else {
            data = await Users.findAll({
                where : {userId : req.userId},
                include: [{
                    model: Users,
                    attributes: ['name', 'price']
                }]
            })
        }
    } catch (error) {
        errorMessage(res, error, 500);
    }
}

export const getProductById = async (req, res) => {
    try {
        
    } catch (error) {
        errorMessage(res, error, 500);
    }
}

export const createProduct = async (req, res) => {
    
    try {

    } catch (error) {
        errorMessage(res, error);
    }
}

export const updateProduct = (req, res) => {

}

export const deleteProduct = (req, res) => {

}