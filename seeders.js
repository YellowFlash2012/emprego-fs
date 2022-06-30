import { readFile } from "fs/promises";

import connectDB from "./config/db.js";
import colors from "colors"

import Job from "./models/Job.js";
import { config } from "dotenv";
config()

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Job.deleteMany();

        const jsonPdts = JSON.parse(
            await readFile(new URL("./config/MOCK_DATA.json", import.meta.url))
        )

        await Job.create(jsonPdts);
        console.log("Success!");
        process.exit(0)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

start()