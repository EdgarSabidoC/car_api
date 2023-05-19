const PDFDocument = require("pdfkit");
const HOME_URL = process.env.HOME_URL;

/**
 * Genera un PDF con encabezado y pie de página y lo pasa al siguiente middleware.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
const buildPdf = (req, res, next) => {
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
	doc.fontSize(25).text("Hello World!", 100, 200);

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
};

module.exports = { buildPdf };
