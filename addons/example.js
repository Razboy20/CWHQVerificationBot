var exports = module.exports;

exports.init = function(client) {
	console.log('BOT INIT');
	// ... you can do stuff here on the init of the client. (this is before the bot logs in)
};

exports.ready = function(client) {
	console.log('BOT READY');
	// ... you can do stuff here on the ready of the client. (this is when the bot logs in)
};

exports.message = function(client, msg) {
	console.log('MESSAGE SENT: ' + msg.content);
	// ... this runs when the bot detects a message sent

	// simple ping pong
	if (msg.content === '!ping') {
		msg.channel.send('Pong!');
	}
};
