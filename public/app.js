import express from "express";
import userRoute from "../routes/user.js";
import taskRoute from "../routes/task.js";
import { connectDB } from "../data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "../middlewares/error.js";
import cors from "cors";

const app = express();

config({
    path: "./data/config.env",
});

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: [process.env.URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(userRoute);
app.use(taskRoute);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server Working on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
// 5:25