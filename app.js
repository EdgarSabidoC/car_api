require("dotenv").config();
const express = require("express"); // Starts the app.
const cors = require("cors");
const dbConnectMongoDB = require("./config/mongo");
const morganBody = require("morgan-body"); // Used to formatting the errors.
const { loggerStream } = require("./utils/handleLogger");
const { dbConnectMariaDB } = require("./config/mariadb");
const ENGINE_DB = process.env.ENGINE_DB;

const app = express(); // Instantiate the app.

app.use(cors()); // The app uses cors.
app.use(express.json()); // The app can use json.
app.use(express.static("storage"));

morganBody(app, {
	noColors: true,
	stream: loggerStream,
	skip: function (req, res) {
		// Only sends a log if there is an error.
		return res.statusCode < 400; // Skips errors between 2xx and 3xx.
	},
});
const port = process.env.PORT || 3000; // App port. Default: 3000.

// Routes call
app.use("/api", require("./routes"));

// Initial function:
app.listen(port, () => {
	console.log(`The app is ready and running on http://localhost:${port}`);
});

ENGINE_DB === "mongodb"
	? // Calls the function to connect to MongoDB:
	  dbConnectMongoDB()
	: // Calls the function to connect to MariaDB:
	  dbConnectMariaDB();
