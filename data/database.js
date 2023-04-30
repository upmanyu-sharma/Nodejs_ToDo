import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            DBname: "BackendAPI",
            useNewUrlParser: true,
        })
        .then(() => console.log("DataBase Connected"))
        .catch((e) => console.log(e.message));
};
