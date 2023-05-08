const ENGINE_DB = process.env.ENGINE_DB;

/**
 * Utiliza el motor de la DB como índice.
 * @returns
 */
const getProperties = () => {
	const data = {
		mariadb: {
			id: "id",
		},
	};
	return data[ENGINE_DB];
};

module.exports = getProperties;
