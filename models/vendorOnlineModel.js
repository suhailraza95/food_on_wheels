const mongoose = require("mongoose");

const vendorOnlineSchema = new mongoose.Schema(
{
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
        unique: true
    },

    latitude: {
        type: Number,
        required: true
    },

    longitude: {
        type: Number,
        required: true
    },

    openTime: {
        type: String,
        required: true
    },

    closeTime: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["online", "offline"],
        default: "offline"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model(
    "VendorOnline",
    vendorOnlineSchema
);