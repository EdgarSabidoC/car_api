const xlsx = require("node-xlsx");
const fs = require("fs");
const { sequelize } = require("../config/mariadb");
const { handleHttpError } = require("../utils/handleError");
const { Sell } = require("../models"); // Referencia a lo exportado en models/index.js

const buildReport = async (req, res, next) => {
	let transaction;
	try {
		const { year, month } = req.query;

		// Inicia una transacción
		transaction = await sequelize.transaction();

		// Realiza la consulta a la base de datos dentro de la transacción
		const sellData = await Sell.findAll({
			where: sequelize.where(
				sequelize.fn("MONTH", sequelize.col("createdAt")),
				month
			),
			transaction,
		});

		// Filtra los registros por año
		const filteredSellData = sellData.filter((sell) => {
			const sellYear = sell.createdAt.getFullYear();
			return sellYear.toString() === year;
		});

		// Construye los datos que se incluirán en el archivo Excel
		const data = filteredSellData.map((sell) => {
			return [
				"Hello world!",
				sell.appointment,
				sell.employee,
				sell.sold_price,
				sell.createdAt,
				sell.updatedAt,
			];
		});

		// Genera el archivo Excel utilizando los datos
		const excelBuffer = xlsx.build([{ name: "Report", data }]);

		// Genera el directorio si no existe:
		const dir = `../storage/reports/${year}`;
		if (!fs.existsSync(dir)) {
			console.log("ENTRÓ EN :", dir);
			fs.mkdirSync(dir, { recursive: true });
		}

		// Guarda el archivo Excel en el sistema de archivos
		const filePath = `${dir}/${month}_report.xlsx`;
		fs.writeFileSync(filePath, excelBuffer);

		// Commit de la transacción si todo se realizó correctamente
		await transaction.commit();

		// Agrega la ruta del archivo Excel generado al objeto de respuesta para que esté disponible en el siguiente middleware o en el controlador
		req.excelFilePath = filePath;

		res.redirect("http://localhost:4200/control-panel"); // Se redirecciona a control-panel.
	} catch (error) {
		// Rollback de la transacción en caso de error
		if (transaction) {
			await transaction.rollback();
		}
		handleHttpError(res, "ERROR_WHILE_CREATING_REPORT", 500);
	}
};

module.exports = { buildReport };
