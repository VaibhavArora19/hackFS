import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB Connected!")
    startServer();
})
.catch((err) => console.log(err))

const startServer = () => {
    app.listen(8000, console.log("Server started"))
}