const ajvInstance = require("../../config/ajv-Instance");

const createCustomerREQSchema = {
    type: "object",

    properties: {


        dpUrl: {
            type: "string"
        },

        firstName: {
            type: "string",
            minLength: 2
        },

        lastName: {
            type: "string",
            minLength: 2
        },

        mobile: {
            type: "string",
            minLength: 10,
            maxLength: 15
        },

        latitude: {
            type: "number"
        },

        longitude: {
            type: "number"
        },

        city: {
            type: "string",
            minLength: 2
        },

        state: {
            type: "string",
            minLength: 2
        },

        privacyPolicyConsent: {
            type: "boolean"
        },

        marketingConsent: {
            type: "boolean"
        },

        termsOfServiceConsent: {
            type: "boolean"
        }
    },

    required: [
        "firstName",
        "lastName",
        "mobile",
        "latitude",
        "longitude",
        "city",
        "state",
        "privacyPolicyConsent",
        "marketingConsent",
        "termsOfServiceConsent"
    ],

    additionalProperties: false
};

module.exports =
    ajvInstance.compile(
        createCustomerREQSchema
    );