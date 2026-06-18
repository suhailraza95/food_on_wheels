const asyncHandler =
require("express-async-handler");

const healthCheck =
asyncHandler(async (req, res) => {

  res.status(200).json({
    success: true,
    message: "Service Healthy",
    environment:
      process.env.APP_ENV,
    timestamp:
      new Date().toISOString()
  });

});

module.exports = {
  healthCheck
};