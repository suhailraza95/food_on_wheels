const asyncHandler = require("express-async-handler");

const Vendor = require("../models/vendorModel");
const VendorOnline = require("../models/vendorOnlineModel");

const goOnline = asyncHandler(
async (req, res) => {

    const {
        vendorId,
        latitude,
        longitude,
        openTime,
        closeTime,
        status
    } = req.body;

    const vendor =
        await Vendor.findById(vendorId);

    if (!vendor) {
        res.status(404);
        throw new Error("Vendor not found");
    }

    const vendorOnline =
        await VendorOnline.findOneAndUpdate(
            { vendorId },

            {
                latitude,
                longitude,
                openTime,
                closeTime,
                status
            },

            {
                upsert: true,
                new: true
            }
        );

    res.status(200).json({
        success: true,
        message:
            "Vendor status updated successfully",
        data: vendorOnline
    });

});

module.exports = {
    goOnline
};