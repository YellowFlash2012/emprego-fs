import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import { config } from "dotenv";
import colors from "colors"

import connectDB from "./config/db.js";

import notFoundRoute from "./middleware/notFoundRoute.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";

config()

const app = express();
app.use(express.json())
app.use(helmet())

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.get("/", (req, res) => {
    throw new Error("error")
    res.send("Welcome!")
})

app.use(notFoundRoute)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000;

connectDB()
app.listen(PORT, () => {
    console.log(`Server on | Port ${PORT}...`);
})