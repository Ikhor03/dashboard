import Users from "../models/userModel.js";
import { errorMessage } from "../utils/utils.js";

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) return res.status(401).json({ message: "Please login to your account" });

    const user = await Users.findOne({
        where: {uuid : req.session.userId}
    })
    if (!user) return res.status(400).json({message : "user not found"});

    req.userId = user.id;
    req.role = user.role;
    next();
}

export const adminOnly = async (req, res, next) => {
    const user = await Users.findOne({
        where: { uuid: req.session.userId }
    })
    if (!user) return res.status(400).json({ message: "user not found" });

    if (user.role !== 'admin') return errorMessage(res, "forbidden Access", 403);

    next();
}