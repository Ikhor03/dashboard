import { Op } from "sequelize";
import Products from "../models/productModel.js";
import Users from "../models/userModel.js";
import { errorMessage } from "../utils/utils.js";

export const getProduct = async (req, res) => {
    try {
        let data;
        if (req.role === "admin") {
            data = await Products.findAll({
                attributes: ['name', 'price', 'uuid'],
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            })
        } else {
            data = await Products.findAll({
                attributes: ['uuid', 'name', 'price'],
                where: { userId: req.userId },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            })
        }

        res.status(200).json(data);
    } catch (error) {
        errorMessage(res, error.message.message, 500);
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Products.findOne({
            where: { uuid: req.params.id }
        })

        if (!product) return errorMessage(res, "Product not found", 404);

        let data;
        if (req.role === "admin") {
            data = await Products.findOne({
                attributes: ['name', 'price', 'uuid'],
                where: {
                    id: product.id
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            })
        } else {
            data = await Products.findOne({
                attributes: ['uuid', 'name', 'price'],
                where: {
                    [Op.and]: [{ userId: req.userId }, { id: product.id }]
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            })
        }

        res.status(200).json(data);
    } catch (error) {
        errorMessage(res, error.message, 500);
    }
}

export const createProduct = async (req, res) => {
    const { name, price } = req.body;
    try {
        await Products.create({
            name: name,
            price: price,
            userId: req.userId
        });
        res.status(201).json({ message: "Items created" });
    } catch (error) {
        errorMessage(res, error.message, 400);
    }
}

export const updateProduct = async (req, res) => {
    const product = await Products.findOne({
        where: {
            uuid: req.params.id
        }
    })

    if (!product) return errorMessage(res, "Product not found", 404);

    const { name, price } = req.body;
    try {
        if (req.role === "admin") {
            await Products.update({ name, price }, {
                where: {
                    id: product.id
                },
            })
        } else {
            if (req.userId !== product.userId) return errorMessage(res, "forbidden Access", 403);
            await Products.update({ name, price }, {
                where: {
                    [Op.and]: [{ userId: req.userId }, { id: product.id }]
                }
            })
        }
        res.status(200).json({message : "Product Updated"})
    } catch (error) {
        errorMessage(res, error.message, 500)
    }
}

export const deleteProduct = async (req, res) => {
    const product = await Products.findOne({
        where : {uuid : req.params.id}
    })
    if (!product) return errorMessage(res, "Product not found", 404);

    try {
        if(req.role === "admin") {
            await Products.destroy({
                where: { id: product.id }
            })
        } else {
            if (req.userId !== product.userId) return errorMessage(res, "Forbiddern Accsess", 403);
            await Products.destroy({
                where: { 
                    [Op.and]: [{ id: product.id }, {userId : req.userId}]
                 }
            })
        }
        res.status(200).json({ message: "Product deleted" })
    } catch (error) {
        errorMessage(res, error.message, 500);
    }
}