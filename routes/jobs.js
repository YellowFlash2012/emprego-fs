import express from "express";
import apicache from "apicache";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

import moment from "moment";

import { BadRequestError, UnAuthenticatedError } from "../errors/errors.js";
import Job from "../models/Job.js";


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
    const { status, jobType, sort, search } = req.query;

    const queryObj = {
        createdBy: req.user,
    };

    if (status && status !== "all") {
        queryObj.status = status;
    };

    if (jobType && jobType !== "all") {
        queryObj.jobType = jobType;
    }

    if (search) {
        queryObj.position={$regex:search,$option:"i"}
    }

    let result = Job.find(queryObj);

    // sorting chains
    if (sort==="latest") {
        result=result.sort("-createdAt")
    }
    if (sort==="oldest") {
        result=result.sort("createdAt")
    }
    if (sort==="a-z") {
        result=result.sort("-position")
    }
    if (sort==="z-a") {
        result=result.sort("position")
    }

    const jobs = await result;

    res.status(StatusCodes.OK).json({
        jobs,
        totalJobs: jobs.length,
        numOfPages: 1,
    });
});

// @desc    Get get all stats
// @route   GET /api/v1/jobs/stats
// @access  Private
router.get("/stats", cache("9 minutes"), async (req, res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user) } },
        { $group: { _id: "$status", count: { $sum: 1 } } }
    ])

    stats = stats.reduce((acc, curr) => {
        const { _id: status, count } = curr

        acc[status] = count

        return acc;
    }, {});

    // default stats placeholders for newly registered users
    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user) } },
        { $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, count: { $sum: 1 }, } },
        { $sort: { "_id.year": -1, "_id.month": -1 } },

        { $limit: 9 }
    ]);

    monthlyApplications = monthlyApplications.map((item) => {
        const { _id: { year, month }, count } = item;
    
        const date = moment().month(month - 1).year(year).format("MMM Y");

        return { date, count };
    }).reverse()

    res.status(StatusCodes.OK).send({ defaultStats, monthlyApplications })
});

// @desc    Get get a single job application
// @route   GET /api/v1/jobs/:id
// @access  Private
router.get("/:id", async (req, res) => {
    res.send("get one job")
})

// @desc    Put update a job application
// @route   PUT /api/v1/jobs/:id
// @access  Private
router.put("/:id", async (req, res, next) => {
    const { id } = req.params;
    const { company, position } = req.body;

    if (!position || !company) {
        throw new BadRequestError("Please enter a value for those fields");
    }

    const job = await Job.findById(id);

    // check permission
    if (req.user===job.createdBy.toString()) {
        next();
    } else {
        throw new UnAuthenticatedError("Not authorized to access this resource");
    };

    const updatedJob = await Job.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
    
    res.status(StatusCodes.OK).json({updatedJob});
})

// @desc    Delete delete a job application
// @route   DELETE /api/v1/jobs/:id
// @access  Private
router.delete("/:id", async (req, res) => {
    await Job.findByIdAndRemove(req.params.id);

    res.status(StatusCodes.OK).json({msg:"Job successfully deleted!"})
})



export default router