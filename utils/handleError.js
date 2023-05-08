const handleHttpError = (res, msg = "Something happend", code = 403) => {
	res.status(code);
	res.send({ error: msg });
};

module.exports = { handleHttpError };
