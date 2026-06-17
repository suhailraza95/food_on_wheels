const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Customer = require("../models/customerModel");

const createCustomer = asyncHandler(
async (req, res) => {

    const {
        userId,
        dpUrl,
        firstName,
        lastName,
        mobile,
        latitude,
        longitude,
        city,
        state,
        privacyPolicyConsent,
        marketingConsent,
        termsOfServiceConsent
    } = req.body;

    const user = await User.findById(
        userId
    );

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (user.accountType !== "user") {
        res.status(403);
        throw new Error(
            "Only user accounts can create customer profiles"
        );
    }

    const existingCustomer =
        await Customer.findOne({
            userId
        });

    if (existingCustomer) {
        res.status(409);
        throw new Error(
            "Customer profile already exists"
        );
    }

    const customer =
        await Customer.create({
            userId,
            dpUrl,
            firstName,
            lastName,
            mobile,
            latitude,
            longitude,
            city,
            state,
            privacyPolicyConsent,
            marketingConsent,
            termsOfServiceConsent
        });

    user.isUserDetailCompleted = true;

    await user.save();

    res.status(201).json({
        success: true,
        message:
            "Customer profile created successfully",
        data: customer
    });

});

module.exports = {
    createCustomer
};