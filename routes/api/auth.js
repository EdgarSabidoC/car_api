const express = require("express");
const { authenticate, callback } = require("../../controllers/auth");
const { isLoggedIn } = require("../../middleware/loggedIn");

const router = express.Router();

router.get("/google", authenticate);

router.get("/google/callback", callback);

router.get("/protected", isLoggedIn, (req, res) => {
	res.send("Hello!");
});

module.exports = router;
