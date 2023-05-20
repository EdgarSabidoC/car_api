const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK; // URL del webhook de slack.
const { IncomingWebhook } = require("@slack/webhook"); // Crea una conexión a slack.
const slackWebhook = new IncomingWebhook(SLACK_WEBHOOK); // Crea la conexión para el webhook de slack.

/**
 * Flujo de registro que escribe el mensaje en el webhook de Slack y en la consola.
 */
const loggerStream = {
	/**
	 * Escribe el mensaje en el webhook de Slack y en la consola.
	 *
	 * @param {string} message - Mensaje a registrar.
	 */
	write: (message) => {
		slackWebhook.send({
			text: message,
		});
		console.log("Capturing the log: ", message);
	},
};

module.exports = { loggerStream };
