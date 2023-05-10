const ENGINE_DB = process.env.ENGINE_DB; // Motor de la Base de datos.

const pathModels = `./${ENGINE_DB}`; // Ruta de los modelos.

// Arreglo con los modelos de sequelize de las tablas de la base de datos:
const models = {
	Appointment: require(`${pathModels}/appointment`),
	Car: require(`${pathModels}/car`),
	CarCategory: require(`${pathModels}/car_category`),
	CarCondition: require(`${pathModels}/car_condition`),
	CarMaker: require(`${pathModels}/car_maker`),
	CarModel: require(`${pathModels}/car_model`),
	Color: require(`${pathModels}/color`),
	Dealership: require(`${pathModels}/dealership`),
	Maintenance: require(`${pathModels}/maintenance`),
	MaintenanceType: require(`${pathModels}/maintenance_type`),
	PostalCode: require(`${pathModels}/postal_code`),
	Price: require(`${pathModels}/price`),
	Schedule: require(`${pathModels}/schedule`),
	State: require(`${pathModels}/state`),
	Transmission: require(`${pathModels}/transmission`),
	User: require(`${pathModels}/user`),
};

// Se exporta el arreglo con los modelos de sequelize:
module.exports = models;
