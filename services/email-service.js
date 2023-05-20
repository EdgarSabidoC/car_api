const nodemailer = require("nodemailer");
let TO_EMAIL = process.env.TO_EMAIL;
let EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
let SECURE = process.env.EMAIL_SECURE;
const HOME_URL = process.env.HOME_URL;

/**
 * Envía un archivo PDF adjunto a través de correo electrónico.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función de siguiente middleware.
 */
const sendPdfToEmail = (req, res, next) => {
	const pdf = req.pdf; // PDF generado.

	// Si no se especificó un correo electrónico  de destinatario en las variables de entorno, se toma el del body de la petición:
	if (TO_EMAIL === "") {
		TO_EMAIL = req.body.email; // Correo electrónico al que se enviará.
	}

	// Usuario y contraseña del correo, sólo si EMAIL_AUTH es true en las variables de entorno:
	let AUTH = {};
	if (process.env.EMAIL_AUTH === "true") {
		AUTH = {
			user: EMAIL_USER, // Dirección de correo electrónico que enviará los correos
			pass: EMAIL_PASSWORD, // Contraseña de correo electrónico que enviará los correos
		};
	}

	// Si el servidor de correo requiere una conexión segura (SSL/TLS), se configura en las variables de entorno:
	if (SECURE === "true") {
		SECURE = true;
	} else {
		SECURE = false;
	}

	// Configura el transporte de correo utilizando Nodemailer y la información del proveedor de correo electrónico:
	const transporter = nodemailer.createTransport({
		// Configura la información del servidor de correo saliente (SMTP):
		EMAIL_HOST: EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		SECURE: SECURE,
		AUTH: AUTH,
	});

	// Define los detalles del correo electrónico
	const mailOptions = {
		from: EMAIL_USER, // Dirección de correo electrónico de la empresa
		to: TO_EMAIL, // La dirección de correo electrónico del destinatario (cliente)
		subject: "Appointment confirmation", // Asunto del correo electrónico
		text: "Attached you will find the PDF with the information of your appointment.", // Texto del correo electrónico
		attachments: [
			{
				filename: "donut-motors_appointment.pdf", // Nombre del archivo adjunto
				content: pdf, // Contenido del archivo adjunto (PDF generado)
			},
		],
	};

	// Se envía el correo electrónico
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log("ERROR_FAILED_TO_SEND_EMAIL: ", error);
		} else {
			console.log("E-mail send:", info.response);
		}
		res.redirect(`${HOME_URL}`); // Se redirecciona a home después de enviar el correo.
	});
};

module.exports = { sendPdfToEmail };
