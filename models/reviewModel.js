const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
{
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },

    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    comment: {
        type: String,
        trim: true,
        default: ""
    }
},
{
    timestamps: true
});

module.exports = mongoose.model(
    "Review",
    reviewSchema
);