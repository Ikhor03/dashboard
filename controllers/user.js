import Users from "../models/userModel.js";
import argon2, { hash } from "argon2"
import { errorMessage } from "../utils/utils.js";


export const getUser = async (req, res) => {
    try {
        const data = await Users.findAll({
            attributes:['uuid','name','email', 'role']
        });
        res.status(200).json(data);
    } catch (error) {
        errorMessage(res, error.message, 500);
    }
}

export const getUserById = async (req, res) => {
    try {
        const data = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where : {uuid : req.params.id}
        });
        res.status(200).json(data);
    } catch (error) {
        errorMessage(res, error.message, 500);
    }
}

export const createUser = async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;
    
    if (password !== confirmPassword){
        return errorMessage(res, "Password not matching", 400);
    }
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({ 
            name,
            email,
            password : hashPassword,
            role 
        });
        res.status(201).json({message : "Register Succesfully"});
    } catch (error) {
        errorMessage(res, error.message, 400);
    }
}

export const updateUser = async (req, res) => {
    const user = await Users.findOne({
        where: { uuid: req.params.id }
    });

    if (!user) return res.status(404).json({message: "User not found"});
    const { name, email, password, confirmPassword, role } = req.body;

    let hashPassword;
    if (password === "" || password === null){
        hashPassword = user.password;
    } else {
        hashPassword = await argon2.hash(password);
    }
    if (password !== confirmPassword) {
        return errorMessage(res, "Password not matching", 203);
    }
    
    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({ message: "User Updated" });
    } catch (error) {
        errorMessage(res, error.message, 400);
    }

}

export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: { uuid: req.params.id }
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    try {
        await Users.destroy({
            where: {id : user.id}
        });
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        errorMessage(res, error.message, 400);
    }
}