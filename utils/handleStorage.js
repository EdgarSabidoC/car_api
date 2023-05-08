const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const pathStorage = `${__dirname}/../storage`;
		cb(null, pathStorage);
	},
	filename: function (req, file, cb) {
		const ext = file.originalname.split(".").pop(); // Obtiene la extensión del archivo.
		const filename = `file-${Date.now()}.${ext}`; // Ejemplo: file-123192312.png
		cb(null, filename);
	},
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
