import express from "express"

const router = express.Router();

router.post("/", async (req, res) => {
    res.send("user signup")
})

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