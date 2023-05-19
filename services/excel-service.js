const ExcelJS = require("exceljs");
const { handleHttpError } = require("../utils/handleError");
const { Op } = require("sequelize");
const { sequelize } = require("../config/mariadb");
const { Sell } = require("../models");

// Meses del año en inglés:
const months = {
	1: "January",
	2: "February",
	3: "March",
	4: "April",
	5: "May",
	6: "June",
	7: "July",
	8: "August",
	9: "September",
	10: "October",
	11: "November",
	12: "December",
};

/**
 * Genera un informe de ventas en formato Excel para un mes y año específicos.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para llamar al siguiente middleware.
 * @throws {Error} - Error al crear el informe.
 */
const buildReport = async (req, res, next) => {
	let transaction;
	try {
		const { year, month } = req.params;

		// Obtener el nombre del mes (en inglés):
		const monthName = months[parseInt(month)];

		// Iniciar la transacción
		transaction = await sequelize.transaction();

		// Se definen el rango de fechas para filtrar los registros por mes y año:
		const startDate = `${year}-${month}-01 00:00:00`;
		const endDate = `${year}-${month}-31 23:59:59`;

		// Realizar la búsqueda en la base de datos dentro de la transacción:
		const sellData = await Sell.findAll({
			where: {
				createdAt: {
					[Op.between]: [startDate, endDate],
				},
			},
			attributes: ["final_sale_price", "createdAt"],
			include: [
				{
					model: Appointment,
					as: "sell_appointment",
					foreignKey: "appointment",
					attributes: [
						"customer_firstname",
						"customer_lastname_1",
						"customer_lastname_2",
					],
					include: [
						{
							model: Dealership,
							foreignKey: "dealership",
							as: "appointment_dealership",
							attributes: ["name"],
						},
						{
							model: Car,
							attributes: ["vin", "sale_price"],
							foreignKey: "car",
							as: "appointment_car",
						},
					],
				},
				{
					model: Employee,
					as: "sell_employee",
					attributes: ["first_name", "last_name_1", "last_name_2"],
					foreignKey: "employee",
				},
			],
			transaction,
		});

		// Crea un nuevo libro de trabajo de Excel
		const workbook = new ExcelJS.Workbook();

		// Nombre del archivo:
		const worksheet = workbook.addWorksheet(`${monthName}_${year.toString()}`);

		// Encabezados del archivo (la primera fila):
		worksheet.addRow([
			"VIN",
			"Sale price",
			"Final sale price",
			"Customer",
			"Dealership",
			"Employee",
			"Sale date",
		]);

		// Se obtienen los datos del cliente, empleado y la fecha de venta para darles formato:
		const customer = `${sell.sell_appointment.customer_firstname} ${sell.sell_appointment.customer_lastname_1} ${sell.sell_appointment.customer_lastname_2}`;
		const employee = `${sell.sell_employee.first_name} ${sell.sell_employee.last_name_1} ${sell.sell_employee.last_name_2}`;
		let sale_date = new Date(sell.createdAt);
		const sale_day = sale_date.getDate();
		const sale_month = sale_date.getMonth() + 1;
		const sale_year = sale_date.getFullYear();
		sale_date = `${sale_day}-${sale_month}-${sale_year}`;

		// Agrega los datos a la hoja de trabajo
		sellData.forEach((sell) => {
			worksheet.addRow([
				sell.sell_appointment.appointment_car.vin,
				sell.sell_appointment.appointment_car.sale_price,
				sell.final_sale_price,
				customer,
				sell.sell_appointment.appointment_dealership.name,
				employee,
				sale_date,
			]);
		});

		// Convierte el libro de trabajo a un buffer
		const excelBuffer = await workbook.xlsx.writeBuffer();

		// Configura las cabeceras de la respuesta para que el archivo se descargue con el nombre deseado
		res.setHeader(
			"Content-Disposition",
			`attachment; filename=${month}_${year}_sells_report.xlsx`
		);
		res.setHeader(
			"Content-Type",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		);

		// Commit de la transacción
		await transaction.commit();

		// Envía el buffer como respuesta al cliente
		res.send(excelBuffer);
	} catch (error) {
		// Rollback de la transacción en caso de un error
		if (transaction) await transaction.rollback();
		handleHttpError(res, "ERROR_WHILE_CREATING_REPORT", 500);
	}
};

module.exports = { buildReport };
