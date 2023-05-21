const multer = require("multer");
const { handleHttpError } = require("./handleError");
const fs = require("fs");

/**
 * Configuración de almacenamiento para multer.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} file - Objeto de archivo cargado.
 * @param {Function} cb - Función de devolución de llamada.
 * @returns {void}
 */
const createStorage = multer.diskStorage({
	/**
	 * Define el directorio de destino para guardar los archivos.
	 * @param {Object} req - Objeto de solicitud.
	 * @param {Object} file - Objeto de archivo cargado.
	 * @param {Function} cb - Función de devolución de llamada.
	 * @returns {void}
	 */
	destination: (req, file, cb) => {
		const pathStorage = `../car_api/storage/car_photos`;
		cb(null, pathStorage);
	},
	/**
	 * Define el nombre de archivo para los archivos cargados.
	 * @param {Object} req - Objeto de solicitud.
	 * @param {Object} file - Objeto de archivo cargado.
	 * @param {Function} cb - Función de devolución de llamada.
	 * @returns {void}
	 */
	filename: function (req, file, cb) {
		const ext = file.originalname.split(".").pop(); // Obtiene la extensión del archivo.
		const filename = `${req.body.vin}.${ext}`;
		cb(null, filename);

		// Verifica si el archivo ya existe en el directorio de destino:
		const existingFilePath = `../car_api/storage/car_photos/${filename}`;
		if (fs.existsSync(existingFilePath)) {
			req.skipFileUpload = true; // Agrega una propiedad personalizada al objeto req
			return;
		}
		// Agrega el nombre de la imagen a una propiedad personalizada del objeto req:
		req.imageFilename = filename;
	},
});

/**
 * Configuración de almacenamiento para multer al actualizar una imagen.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} file - Objeto de archivo cargado.
 * @param {Function} cb - Función de devolución de llamada.
 * @returns {void}
 */
const updateStorage = multer.diskStorage({
	/**
	 * Define el directorio de destino para guardar los archivos.
	 * @param {Object} req - Objeto de solicitud.
	 * @param {Object} file - Objeto de archivo cargado.
	 * @param {Function} cb - Función de devolución de llamada.
	 * @returns {void}
	 */
	destination: (req, file, cb) => {
		const pathStorage = `../car_api/storage/car_photos`;
		cb(null, pathStorage);
	},
	/**
	 * Define el nombre de archivo para los archivos cargados durante la actualización.
	 * @param {Object} req - Objeto de solicitud.
	 * @param {Object} file - Objeto de archivo cargado.
	 * @param {Function} cb - Función de devolución de llamada.
	 * @returns {void}
	 */
	filename: function (req, file, cb) {
		const { vin } = req.params;
		console.log("VIN: ", vin);
		const ext = file.originalname.split(".").pop(); // Obtiene la extensión del archivo.
		const filename = `${vin}.${ext}`;
		cb(null, filename);
		// Agrega el nombre de la imagen a una propiedad personalizada del objeto req:
		req.imageFilename = `${filename}`;
	},
});

const createStorageMiddleware = multer({ storage: createStorage });
const updateStorageMiddleware = multer({ storage: updateStorage });

module.exports = { createStorageMiddleware, updateStorageMiddleware };
