const asyncHandler = require("express-async-handler");

const Vendor = require("../models/vendorModel");
const Customer = require("../models/customerModel");
const Review = require("../models/reviewModel");

const addReview = asyncHandler(
async (req, res) => {

    const {
        vendorId,
        customerId,
        stars,
        comment
    } = req.body;

    const vendor =
        await Vendor.findById(vendorId);

    if (!vendor) {
        res.status(404);
        throw new Error(
            "Vendor not found"
        );
    }

    const customer =
        await Customer.findById(customerId);

    if (!customer) {
        res.status(404);
        throw new Error(
            "Customer not found"
        );
    }

    const review =
        await Review.create({
            vendorId,
            customerId,
            stars,
            comment
        });

    res.status(201).json({
        success: true,
        message:
            "Review added successfully",
        data: review
    });

});

module.exports = {
    addReview
};