const bcrypt = require("bcryptjs");

/**
 *  Takes a password string and
 *  returns the result of calling bcrypt.hash
 *  with password and 15 as arguments.
 * @param {*} password
 * @returns
 */
const encrypt = async (password) => {
	return await bcrypt.hash(password, 15);
};

/**
 *  Takes a password string and a password hash
 *  returns the result of the comparison between
 *  the password and the password hash.
 * @param {*} password
 * @param {*} passwordHash
 * @returns
 */
const compare = async (password, passwordHash) => {
	return await bcrypt.compare(password, passwordHash);
};

module.exports = { encrypt, compare };
