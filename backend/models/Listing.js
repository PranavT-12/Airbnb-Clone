import Joi from "joi";
import mongoose from "mongoose";

const listingSchema  = new mongoose.Schema({
    title: { type: String, required: true },
    description : { type: String }, 
    price: { type: Number, required: true },
    location : { type: String, required: true },
    image: { type: String, required: true},
}, {timestamps: true });

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;