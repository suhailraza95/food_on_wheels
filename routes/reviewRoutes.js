const express = require("express");

const {
    addReview
} = require(
    "../controllers/reviewController"
);
const validateDto = require("../middleware/validate-dto")
const addReviewREQSchema = require("../schema/request-schema/add-review-schema");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/",
    protect,
    validateDto(addReviewREQSchema),
    addReview);

module.exports = router;