const isLoggedIn = (req, res, next) => {
	req.cookies.token ? res.send(true) : res.send(false);
};

module.exports = { isLoggedIn };
