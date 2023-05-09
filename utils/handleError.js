const handleHttpError = (res, msg = "Something happend", code = 403) => {
	res.status(code).send({ error: msg });
};

module.exports = { handleHttpError };
