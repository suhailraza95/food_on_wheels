const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    createCustomer
} = require("../controllers/customerController");
const validateDto = require("../middleware/validate-dto")
const createCustomerREQSchema = require("../schema/request-schema/create-customer-schema")

const router = express.Router();

router.post("/profile",
    protect,
    validateDto(createCustomerREQSchema),
    createCustomer);

module.exports = router;