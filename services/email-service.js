const nodemailer = require("nodemailer");
let toEmail = process.env.TO_EMAIL;
let host = process.env.EMAIL_HOST;
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;
let secure = process.env.EMAIL_SECURE;

const sendPdfToEmail = (req, res, next) => {
	const pdf = req.pdf; // PDF generado.

	// Si no se especificó un correo electrónico en las variables, se toma el del body de la petición:
	if (toEmail === "") {
		toEmail = req.body.email; // Correo electrónico al que se enviará.
	}

	let auth = {};
	if (process.env.EMAIL_AUTH === "true") {
		auth = {
			user: emailUser, // Dirección de correo electrónico que enviará los correos
			pass: emailPassword, // Contraseña de correo electrónico que enviará los correos
		};
	}

	if (secure === "true") {
		secure = true;
	} else {
		secure = false;
	}

	// Configura el transporte de correo utilizando Nodemailer y la información de tu proveedor de correo electrónico
	const transporter = nodemailer.createTransport({
		// Configura la información del servidor de correo saliente (SMTP)
		host: host,
		port: process.env.EMAIL_PORT,
		secure: secure, // Si el servidor de correo requiere una conexión segura (SSL/TLS), cambia esto a true
		auth: auth,
	});

	// Define los detalles del correo electrónico
	const mailOptions = {
		from: emailUser, // Tu dirección de correo electrónico
		to: toEmail, // La dirección de correo electrónico del destinatario
		subject: "Appointment confirmation", // Asunto del correo electrónico
		text: "Attached you will find the PDF with the information of your appointment.", // Texto del correo electrónico
		attachments: [
			{
				filename: "donut-motors_appointment.pdf", // Nombre del archivo adjunto
				content: pdf, // Contenido del archivo adjunto (PDF generado)
			},
		],
	};

	// Envía el correo electrónico
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log("ERROR_FAILED_TO_SEND_EMAIL: ", error);
		} else {
			console.log("E-mail send:", info.response);
		}
		res.redirect("http://localhost:4200/home"); // Se redirecciona a home.
	});
};

module.exports = { sendPdfToEmail };
