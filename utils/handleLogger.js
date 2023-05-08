const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK; // URL del webhook de slack.
const { IncomingWebhook } = require("@slack/webhook"); // Crea una conexión a slack.
const slackWebhook = new IncomingWebhook(SLACK_WEBHOOK); // Crea la conexión para el webhook de slack.

const loggerStream = {
	write: (message) => {
		slackWebhook.send({
			text: message,
		});
		console.log("Capturing the log", message);
	},
};

module.exports = { loggerStream };
