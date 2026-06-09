const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    mobile: {
        type: String,
        required: true,
        trim: true
    },

    businessName: {
        type: String,
        required: true,
        trim: true
    },

    city: {
        type: String,
        required: true,
        trim: true
    },

    state: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        required: true,
        trim: true
    },

    privacyPolicyConsent: {
        type: Boolean,
        required: true
    },

    marketingConsent: {
        type: Boolean,
        required: true
    },

    termsOfServiceConsent: {
        type: Boolean,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model(
    "Vendor",
    vendorSchema
);