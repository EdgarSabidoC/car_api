const express = require("express");
const fs = require("fs");
const router = express.Router();
const PATH_ROUTES = "./routes/api"; // Obtiene la ruta absoluta de los archivos de la api.

const removeExtension = (fileName) => {
	// Separa el nombre de un archivo, e.g. car.js -> [car, js].
	return fileName.split(".").shift();
};

// Crea rutas dinámicas:
fs.readdirSync(PATH_ROUTES).forEach((file) => {
	// Remueve la extensión ".js" de los archivos de las rutas:
	const name = removeExtension(file); // Ejemplo: user, storage, car
	// Crea la ruta:
	router.use(`/${name}`, require(`../routes/api/${file}`)); // Ejemplo: http://localhost:3001/api/car
});

module.exports = router;
