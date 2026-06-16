const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Vendor = require("../models/vendorModel");
const VendorOnline = require("../models/vendorOnlineModel");
const Review = require("../models/reviewModel");

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

const getVendorDetails = asyncHandler(
async (req, res) => {

    const { vendorId } = req.params;

    const vendor =
        await Vendor.findById(vendorId);

    if (!vendor) {
        res.status(404);
        throw new Error(
            "Vendor not found"
        );
    }

    const vendorOnline =
        await VendorOnline.findOne({
            vendorId
        });

    const reviews =
        await Review.find({
            vendorId
        });

    const totalReviews =
        reviews.length;

    const averageRating =
        totalReviews > 0
            ? (
                reviews.reduce(
                    (sum, review) =>
                        sum + review.stars,
                    0
                ) / totalReviews
              ).toFixed(1)
            : 0;

    res.status(200).json({
        success: true,

        vendor: {

            vendorId:
                vendor._id,

            businessName:
                vendor.businessName,

            category:
                vendor.category,

            city:
                vendor.city,

            state:
                vendor.state,

            status:
                vendorOnline?.status ||
                "offline",

            openTime:
                vendorOnline?.openTime,

            closeTime:
                vendorOnline?.closeTime,

            averageRating,

            totalReviews,

            reviews
        }
    });

});

module.exports = {
    createVendor,
    getVendorDetails
};