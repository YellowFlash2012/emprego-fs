import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import xss from "xss-clean"
import mongoSanitize from "express-mongo-sanitize"
import { config } from "dotenv";
import colors from "colors"

import path from "path"
import "express-async-errors"

import connectDB from "./config/db.js";
import usersRoutes from "./routes/users.js";
import jobsRoutes from "./routes/jobs.js";

import notFoundRoute from "./middleware/notFoundRoute.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import protect from "./middleware/auth.js";

config()

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.get("/api/v1", (req, res) => {
    res.send("Welcome!")
    throw new Error("error")
})


app.use("/api/v1/users", usersRoutes)
app.use("/api/v1/jobs", protect, jobsRoutes)

// config for deployment
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running");
    });
}

app.use(notFoundRoute)
app.use(errorHandlerMiddleware)

connectDB()
app.listen(PORT, () => {
    console.log(`Server on | Port ${PORT}...`);
})