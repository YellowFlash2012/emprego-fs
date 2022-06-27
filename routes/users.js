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

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        throw new BadRequestError("Email is already in use!");

        return;
    }

    const newUser = await User.create({ name, email, password });
    const token = newUser.createJWT();

    res.status(StatusCodes.CREATED).json({
        user: {
            name: newUser.name,
            lastName: newUser.lastName,
            email: newUser.email,
            location: newUser.location,
        },
        token,
    });
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