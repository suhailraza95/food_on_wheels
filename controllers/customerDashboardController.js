const asyncHandler = require("express-async-handler");

const Customer = require("../models/customerModel");
const Vendor = require("../models/vendorModel");
const VendorOnline = require("../models/vendorOnlineModel");

const calculateDistance = (
    lat1,
    lon1,
    lat2,
    lon2
) => {

    const R = 6371;

    const dLat =
        (lat2 - lat1) *
        (Math.PI / 180);

    const dLon =
        (lon2 - lon1) *
        (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) *
            Math.sin(dLat / 2) +
        Math.cos(
            lat1 * (Math.PI / 180)
        ) *
            Math.cos(
                lat2 * (Math.PI / 180)
            ) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return R * c;
};

const getDashboard = asyncHandler(
async (req, res) => {
///
    const userId = req.user.id;

    const customer =
        await Customer.findOne({
            userId
        });


    if (!customer) {
        res.status(404);
        throw new Error(
            "Customer not found"
        );
    }

    const onlineVendors =
        await VendorOnline.find({
            status: "online"
        });

    const vendors = [];

    for (const onlineVendor of onlineVendors) {

        const distance =
            calculateDistance(
                customer.latitude,
                customer.longitude,
                onlineVendor.latitude,
                onlineVendor.longitude
            );


        if (distance <= 3) {

            const vendor =
                await Vendor.findById(
                    onlineVendor.vendorId
                );
                
            if (vendor) {

                vendors.push({
                    vendorId: vendor._id,

                    businessName:
                        vendor.businessName,

                    category:
                        vendor.category,

                    city:
                        vendor.city,

                    state:
                        vendor.state,

                    distance:
                        Number(
                            distance.toFixed(2)
                        ),

                    status:
                        onlineVendor.status,

                    openTime:
                        onlineVendor.openTime,

                    closeTime:
                        onlineVendor.closeTime
                });
            }
        }
    }

    res.status(200).json({
        success: true,
        count: vendors.length,
        vendors
    });

});

module.exports = {
    getDashboard
};