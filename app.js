require("dotenv").config();
const express = require("express"); // Arranca la app.
const cors = require("cors");
const morganBody = require("morgan-body"); // Utilizado para darle formato a los errores.
const { loggerStream } = require("./utils/handleLogger");
const { dbConnectMariaDB } = require("./config/mariadb");
const ENGINE_DB = process.env.ENGINE_DB;

const app = express(); // Instantiate the app.

app.use(cors()); // La app usa cors.
app.use(express.json()); // La app puede usar json.
app.use(express.static("storage"));

morganBody(app, {
	noColors: true,
	stream: loggerStream,
	skip: function (req, res) {
		// Solamente se envía un log si hay un error.
		return res.statusCode < 400; // Evita los errores entre 2xx y 3xx.
	},
});
const port = process.env.PORT || 3000; // Puerto de la app. Predeterminado: 3000.

// Llamado a las rutas:
app.use("/api", require("./routes"));

// Función inicial:
app.listen(port, () => {
	console.log(`The app is ready and running on http://localhost:${port}`);
});

if (ENGINE_DB === "mariadb")
	// Llama la función para conectarse a MariaDB:
	dbConnectMariaDB();
