const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

router.get("/profile", authenticate, (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Authentication successful",
        data: {
            user: req.user
        }
    });
});

module.exports = router;