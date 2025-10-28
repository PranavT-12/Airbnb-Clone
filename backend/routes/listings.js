import express from "express";
import Listing from "../models/Listing.js";


const router = express.Router();

//Get all listings
router.get("/", async (req, res) => {
    try {
        const listings = await Listing.find();
        res.json(listings);
    } catch {
        res.status(500).json({ message: error.message });
    }
});

//Create new listing
router.post("/", async (req, res) => {
    const { title, description, price, location, image } = req.body;

    try {
        const newListing = new Listing({ title, description, price, location, image });
        await newListing.save();
        res.status(201).json(newListing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//Delete listing 
router.delete("/:id", async (req, res) => {
    try {
        const deletedListing = await Listing.findByIdAndDelete(req.params.id);
        if (!deletedListing) return res.status(404).json({ message: "Listing not found" });

        res.json({ message: "Listing deleted", id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
