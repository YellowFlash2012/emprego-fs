import express from "express"
import {StatusCodes} from "http-status-codes"
import { BadRequestError } from "../errors/errors.js";
import User from "../models/User.js";

const router = express.Router();


router.post("/", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new BadRequestError("Please provide all values");
    };

    const existingUser = User.findOne({ email: email });

    if (existingUser) {
        throw new BadRequestError("Email is already is use!");

        return;
    }
});

router.post("/login", async (req, res) => {
    res.send("user login")
})

// @desc    Put update a user
// @route   Put /api/v1/users/:id
// @access  Private
router.put("/", async (req, res) => {
    res.send("user update")
})

export default router