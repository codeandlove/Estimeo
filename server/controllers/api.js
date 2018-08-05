
// Create endpoint /api for GET
exports.testApiConnection = function (req, res) {
    res.json({status: "connected"});
};
