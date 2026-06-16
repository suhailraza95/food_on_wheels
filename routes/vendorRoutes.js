const express = require("express");
const router = express.Router();

const {
    createVendor,getVendorDetails
} = require("../controllers/vendorController");
const validateDto = require("../middleware/validate-dto")
const vendorformREQSchema = require("../schema/request-schema/vendor-form-schema")


router.post(
    "/profile",
    validateDto(vendorformREQSchema),
    createVendor
);

router.get(
    "/:vendorId",
    getVendorDetails
);

module.exports = router;