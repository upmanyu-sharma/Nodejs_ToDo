import mongoose from "mongoose";

export const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URL, {
            DBname: "BackendAPI",
            useNewUrlParser: true,
        })
        .then(() => console.log("DataBase Connected"))
        .catch((e) => console.log(e));
};
