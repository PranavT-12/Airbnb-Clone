import Joi from "joi";
import mongoose from "mongoose";

//Define user Schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true, //ek username do users ka nhi hoga
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,  // ek email ek user ke liye hi hoga
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true, //password hash karke save hoga 
            minlength: 6,
        },
    },
    { timestamps: true } //createdAt, updatedAt automatic add
);

const User  = mongoose.model("User", userSchema);

export default User;