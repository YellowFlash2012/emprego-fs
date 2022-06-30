import express from "express";
import apicache from "apicache";
import { BadRequestError } from "../errors/errors.js";
import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";


const router = express.Router();
let cache = apicache.middleware;

// @desc    Post add a new job application
// @route   POST /api/v1/jobs
// @access  Private
router.post("/", async (req, res) => {
    const { company, position } = req.body;

    if (!position||!company) {
        throw new BadRequestError("Please enter a value for those fields")
    };

    req.body.createdBy = req.user;

    const job = await Job.create(req.body);

    res.status(StatusCodes.CREATED).send({ job });
})

// @desc    Get get all job applications
// @route   GET /api/v1/jobs
// @access  Private
router.get("/", cache("30 minutes"), async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user });

    res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
})

// @desc    Get get all stats
// @route   GET /api/v1/jobs/stats
// @access  Private
router.get("/stats", cache("9 minutes"), async (req, res) => {
    res.send("get all stats")
})

// @desc    Get get a single job application
// @route   GET /api/v1/jobs/:id
// @access  Private
router.get("/:id", async (req, res) => {
    res.send("get one job")
})

// @desc    Put update a job application
// @route   PUT /api/v1/jobs/:id
// @access  Private
router.put("/:id", async (req, res) => {
    res.send("update a job")
})

// @desc    Delete delete a job application
// @route   DELETE /api/v1/jobs/:id
// @access  Private
router.delete("/:id", async (req, res) => {
    res.send("delete a job")
})



export default router