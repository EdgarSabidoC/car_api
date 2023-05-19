const logOut = (req, res) => {
	req.session.destroy();
	res.cookie("token", "", { maxAge: 0, httpOnly: true });
	res.redirect("http://localhost:4200/login");
};

module.exports = { logOut };
