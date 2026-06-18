const ajvInstance = require("../../config/ajv-Instance");

const addReviewREQSchema = {
    type: "object",

    properties: {

        vendorId: {
            type: "string"
        },

        customerId: {
            type: "string"
        },

        stars: {
            type: "integer",
            minimum: 1,
            maximum: 5
        },

        comment: {
            type: "string"
        }
    },

    required: [
        "vendorId",
        "customerId",
        "stars"
    ],

    additionalProperties: false
};

module.exports =
    ajvInstance.compile(
        addReviewREQSchema
    );