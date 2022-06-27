import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import validator from "validator";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your full name"],
            maxlength: 20,
        },

        email: {
            type: String,
            required: [true, "Please enter a valid email"],
            validate: {
                validator: validator.isEmail,
                message:"Please provide a valid email address"
            },
            unique: true,
        },

        password: {
            type: String,
            required: [true, "Please enter a valid password"],
            minlength: 13,
            maxlength: 21,
        },

        lastName: { type: String, maxlength: 20, default: "lastName" },

        location: { type: String, maxlength: 20, default: "my city" },
    },
    {
        timestamps: true,
    }
);

// ***comparing the pw for the login route***
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// ***hashing the password for the register route***
userSchema.pre('save', async function (next) {
    console.log(this.password);
    if (!this.isModified('password')) {
        next();
        
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
})

// ***creating jwt sign***
userSchema.methods.createJWT = function () {
    console.log(this);
    return jwt.sign({ id: this._id }, process.env.jwt_secret, { expiresIn: "3d" })
};

const User = mongoose.model("user", userSchema);

export default User