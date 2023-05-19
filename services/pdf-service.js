const PDFDocument = require("pdfkit");
const buildPdf = (req, res, next) => {
	const doc = new PDFDocument();
	const buffers = [];

	doc.on("data", (chunk) => {
		buffers.push(chunk);
	});

	doc.on("end", () => {
		const pdfBuffer = Buffer.concat(buffers);
		req.pdf = pdfBuffer;
		next();
	});

	doc.fontSize(25).text("Hello World!", 100, 100);
	doc.end();
};

module.exports = { buildPdf };
