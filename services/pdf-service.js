const PDFDocument = require("pdfkit");
const { Dealership } = require("../models"); // Referencia a lo exportado en models/index.js
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mariadb");
const HOME_URL = process.env.HOME_URL;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

/**
 * Genera un PDF con encabezado y pie de página y lo pasa al siguiente middleware.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware.
 * @throws {Error} Error al crear un PDF.
 */
const buildPdf = async (req, res, next) => {
	let transaction;
	try {
		transaction = await sequelize.transaction();
		// Se obtienen los datos de la cita:
		const {
			customer_firstname,
			customer_lastname_1,
			customer_lastname_2,
			email,
			telephone,
			appointment_date,
			appointment_time,
			dealership,
			car,
		} = req.body;

		const customer = `${customer_firstname} ${customer_lastname_1} ${customer_lastname_2}`;

		// Se ejecuta la consulta dentro de la transacción para hallar la sede:
		const dealership_data = await Dealership.findOne({
			where: { id: dealership },
			attributes: ["name"],
			transaction,
		});

		// Se obtiene el nombre de la sede:
		const dealership_name = dealership_data.name;

		// Se debe de buscar información en la BD sobre el dealership con transacciones.
		// const customer = "Edgar Sabido Cortés";
		// const dealership_name = "Donut-Motors Timeless Car Boutique";
		// const email = "example@example.com";
		// const appointment_date = "19-05-2023";
		// const appointment_time = "17:00";
		// const car = "1ZVHT80N775372738";
		// const telephone = "9996271237";

		const doc = new PDFDocument({
			size: "A4",
			margins: {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
			},
		});

		const buffers = [];

		doc.on("data", (chunk) => {
			buffers.push(chunk);
		});

		doc.on("end", () => {
			const pdfBuffer = Buffer.concat(buffers);
			req.pdf = pdfBuffer;
			next();
		});

		// Header:
		const headerImagePath = "./storage/assets/pdf/header.png"; // Ruta de la imagen del encabezado

		// Se agrega el enlace al sitio web al header:
		doc.link(0, 0, doc.page.width, 150, `${HOME_URL}`); // Enlace que envuelve el área del header

		// Se añade el header:
		doc.image(headerImagePath, {
			fit: [600, 150], // Tamaño de la imagen en el encabezado
			align: "center",
		});

		// Se agrega la información al PDF:
		doc.fontSize(25).text(`Hello, ${customer}.`, 100, 200);
		doc.fontSize(20).text("Your appointment has been successfully registered!");
		doc.moveDown();
		doc
			.fontSize(17)
			.text("Attached to this document are the data you have provided us.");
		doc.moveDown();
		doc
			.font("Helvetica-Bold")
			.fontSize(15)
			.text("Email: ", { continued: true });
		doc.font("Helvetica").text(email);
		doc
			.font("Helvetica-Bold")
			.fontSize(15)
			.text("Telephone: ", { continued: true });
		doc.font("Helvetica").fontSize(13.5).text(telephone);
		doc.moveDown();
		doc.moveDown();
		doc.moveDown();
		doc
			.font("Helvetica-Bold")
			.fontSize(15)
			.text("Vehicle Identification Number (VIN): ", { continued: true });
		doc.font("Helvetica").fontSize(13.5).text(car);
		doc.font("Helvetica-Bold").fontSize(15).text("Date: ", { continued: true });
		doc.font("Helvetica").fontSize(13.5).text(appointment_date);
		doc.font("Helvetica-Bold").fontSize(15).text("Time: ", { continued: true });
		doc.font("Helvetica").fontSize(13.5).text(appointment_time);
		doc
			.font("Helvetica-Bold")
			.fontSize(15)
			.text("Dealership: ", { continued: true });
		doc.font("Helvetica").fontSize(13.5).text(dealership_name);
		doc.moveDown();
		doc.moveDown();
		doc.moveDown();
		doc.moveDown();
		doc.moveDown();
		doc.moveDown();
		doc.moveDown();
		doc.moveDown();
		doc.moveDown();
		doc.moveDown();
		doc.moveDown();
		doc.moveDown();
		doc.moveDown();
		doc.moveDown();
		doc.moveDown();
		doc.moveDown();
		doc
			.font("Helvetica-Bold")
			.fontSize(12)
			.text("Contact: ", { continued: true });
		doc.font("Helvetica").fontSize(10).text(`${CONTACT_EMAIL}`);

		// Footer:
		const footerImagePath = "./storage/assets/pdf/footer.png"; // Ruta de la imagen del pie de página
		const footerImageOptions = {
			fit: [600, 300], // Tamaño de la imagen en el pie de página
			align: "center",
		};

		// Se mueve el cursor a la posición del pie de página:
		const footerPosition = doc.page.height - footerImageOptions.fit[1] + 167;

		// Se posiciona la imagen del pie de página:
		const footerImagePosition = {
			x: (doc.page.width - footerImageOptions.fit[0]) / 2,
			y: footerPosition + 10,
		};

		// Se añade el footer:
		doc.image(
			footerImagePath,
			footerImagePosition.x,
			footerImagePosition.y,
			footerImageOptions
		);

		doc.end();

		// Se confirma la transacción si la consulta se ejecuta correctamente:
		await transaction.commit();
	} catch (error) {
		// Se deshace la transacción en caso de un error:
		if (transaction) await transaction.rollback();

		// Se envía el error:
		handleHttpError(res, "ERROR_GET_ITEMS", 500);
	}
};

module.exports = { buildPdf };
