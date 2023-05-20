const bcrypt = require("bcryptjs");

/**
 * Toma la cadena de una contraseña y retorna su hash.
 *
 * @param {*} password
 * @returns
 */
const encrypt = async (password) => {
	return await bcrypt.hash(password, 15);
};

/**
 * Toma la cadena de la contraseña y el hash de una contraseña,
 * retorna el resultado de la comparación de ambas cadenas.
 *
 * @param {*} password
 * @param {*} passwordHash
 * @returns
 */
const compare = async (password, passwordHash) => {
	return await bcrypt.compare(password, passwordHash);
};

module.exports = { encrypt, compare };
