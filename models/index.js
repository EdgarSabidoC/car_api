const ENGINE_DB = process.env.ENGINE_DB;

const pathModels = `./${ENGINE_DB}`;

const models = {
	carModel: require(`${pathModels}/car`),
	storageModel: require(`${pathModels}/storage`),
};

module.exports = models;
