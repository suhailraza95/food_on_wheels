const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Vendor = require("../models/vendorModel");

const createVendor = asyncHandler(
async (req, res) => {

    const {
        userId,
        firstName,
        lastName,
        mobile,
        businessName,
        city,
        state,
        category,
        privacyPolicyConsent,
        marketingConsent,
        termsOfServiceConsent
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (user.accountType !== "vendor") {
        res.status(403);
        throw new Error(
            "Only vendor accounts can create vendor profiles"
        );
    }

    const existingVendor =
        await Vendor.findOne({
            userId
        });

    if (existingVendor) {
        res.status(409);
        throw new Error(
            "Vendor profile already exists"
        );
    }

    const vendor =
        await Vendor.create({
            userId,
            firstName,
            lastName,
            mobile,
            businessName,
            city,
            state,
            category,
            privacyPolicyConsent,
            marketingConsent,
            termsOfServiceConsent
        });

    user.isUserDetailCompleted = true;

    await user.save();

    res.status(201).json({
        success: true,
        message:
            "Vendor profile created successfully",
        data: vendor
    });

});

module.exports = {
    createVendor
};