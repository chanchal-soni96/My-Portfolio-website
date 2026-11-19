import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name Required!"],

    },
    email: {
        type: String,
        required: [true, "Email Required!"],

    },
    phone: {
        type: String,
        required: [true, "Phone Number Required!"],

    },
    aboutMe: {
        type: String,
        required: [true, "About Me field is Required!"],

    },
    password: {
        type: String,
        required: [true, "Password is Required!"],
        minLength: [8, "Password must contain at least 8 characters!"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url:{
            type: String,
            required: true,
        },
    },
    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url:{
            type: String,
            required: true,
        },
    },
    portfolioURL: {
        type: String,
        required: [true, "Portfolio URL is Required!"],

    },
    githubURL: String,
    linkdinURL: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// For Hashing Password
userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
});

// For comparing password with hashed password
userSchema.methods.comparePassword = async function(enterdPassword){
    return await bcrypt.compare(enterdPassword, this.password);
};

// Generating JSON web token
userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES
    })
}



export const User = mongoose.model("User", userSchema);
