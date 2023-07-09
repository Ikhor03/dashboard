import Users from "../models/userModel.js";
import argon2 from "argon2";

export const login = async (req, res) => {
    const user = await Users.findOne({
        where : {email : req.body.email}
    });
    if (!user) return res.status(404).json({message : "User not found"});

    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({message : "Password and Email not matching"});

    req.session.userId = user.uuid;
    const {uuid, name, email, role} = user;
    res.status(200).json({uuid, name, email, role});
}

export const logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(400).json({message : "can't logout"});
        res.status(200).json({message : "Logout Succesfully"});
    });
}

export const me = async (req, res) => {
    if (!req.session.userId) return res.status(401).json({message: "Please login to your account"});

    const user = await Users.findOne({
        attributes : ['uuid', 'name', 'email', 'role'],
        where: { uuid: req.session.userId }
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);

}