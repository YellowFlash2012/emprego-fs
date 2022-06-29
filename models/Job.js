import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, "Please enter the company name"],
            maxlength: 50,
        },

        position: {
            type: String,
            required: [true, "Please enter the position you applied for"],

            maxlength: 50,
        },

        status: {
            type: String,
            enum: ["interview", "pending", "declined"],
            default:"pending"
        },
        
        jobType: {
            type: String,
            enum: ["full-time", "part-time", "remote", "internship"],
            default:"full-time"
        },

        jobLocation: {
            type: String,
            default: "my city",
            required:true
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required:true
        }
    },
    {
        timestamps: true,
    }
);

const Job = mongoose.model("job", jobSchema);

export default Job;
