const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
  type: String,
  required: true,
  select: false
},

    accountType: {
        type: String,
        enum: ['user', 'vendor'],
        required: true
    },

    isEmailVerified: {
        type: Boolean,
        default: false
    },

    privacyPolicyConsent: {
        type: Boolean,
        default: false
    },

    termsOfServiceConsent: {
        type: Boolean,
        default: false
    },

    marketingConsent: {
        type: Boolean,
        default: false
    },

    aiProcessingConsent: {
        type: Boolean,
        default: false
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    isUserDetailCompleted: {
        type: Boolean,
        default: false
    },

    refreshToken: {
  type: String,
  default: null,
  select: false
},
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);