const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    dpUrl: {
        type: String,
        default: null
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

    latitude: {
        type: Number,
        required: true
    },

    longitude: {
        type: Number,
        required: true
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
    "Customer",
    customerSchema
);