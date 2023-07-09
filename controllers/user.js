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
        errorMessage(res, error, 500);
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
        errorMessage(res, error, 500);
    }
}

export const createUser = async (req, res) => {
    const { name, email, password, cofirmPassword, role } = req.body;
    if (password !== cofirmPassword){
        return res.json({message : "Password not matching"});
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
        errorMessage(res, error, 400);
    }
}

export const updateUser = async (req, res) => {
    const user = await Users.findOne({
        where: { uuid: req.params.id }
    });

    if (!user) return res.status(404).json({message: "User not found"});
    const { name, email, password, cofirmPassword, role } = req.body;

    let hashPassword;
    if (password === "" || password === null){
        hashPassword = user.password;
    } else {
        hashPassword = argon2.hash(password);
    }
    if (password !== cofirmPassword) {
        return res.json({ message: "Password not matching" });
    }
console.log(hashPassword)

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
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        errorMessage(res, error, 400);
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
        errorMessage(res, error, 400);
    }
}