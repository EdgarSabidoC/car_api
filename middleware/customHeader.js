const customHeader = (req, res, next) => {
	try {
		const apiKey = req.headers.api_key;

		// Validación:
		if (apiKey === "public-key-123") {
			next();
		} else {
			res.status(403);
			res.send({ errors: "API_KEY_NOT_VALID" });
		}
	} catch (err) {
		res.status(403);
		res.send({ errors: "SOMETHING_WENT_WRONG_WITH_CUSTOM_HEADER" });
	}
};

module.exports = customHeader;
