import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import { config } from "dotenv";
import colors from "colors"

import connectDB from "./config/db.js";
import usersRoutes from "./routes/users.js";
import jobsRoutes from "./routes/jobs.js";

import notFoundRoute from "./middleware/notFoundRoute.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";

config()

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json())
app.use(helmet())

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.get("/", (req, res) => {
    throw new Error("error")
    res.send("Welcome!")
})


app.use("/api/v1/users", usersRoutes)
app.use("/api/v1/jobs", jobsRoutes)

app.use(notFoundRoute)
app.use(errorHandlerMiddleware)

connectDB()
app.listen(PORT, () => {
    console.log(`Server on | Port ${PORT}...`);
})