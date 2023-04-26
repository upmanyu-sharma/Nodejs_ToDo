import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import errorHandler from "../middlewares/error.js";

export const home = (req, res) => {
    res.send("OAHKCV");
};

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user) return next(new errorHandler("user already exists", 404));

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword });

        sendCookie(user, res, "Registered Successfully", 201);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //select isliye use kra hai kyuki hmne schema mai password select false kra hai pr yha use krna hai hme use
        let user = await User.findOne({ email }).select("+password");

        if (!user)
            return next(new errorHandler("Invalid username or password", 404));

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return next(new errorHandler("Invalid username or password", 404));
        sendCookie(user, res, `Welcome user, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
};

export const getMyProfile = (req, res) => {
    res.status(200).json({
        success: "true",
        user: req.user,
    });
};

export const logout = async (req, res) => {
    res.status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "development" ? false : true,
        })
        .json({
            success: "true",
            user: req.user,
        });
};
