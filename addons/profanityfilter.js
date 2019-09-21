// All code developed by Razboy20; taken from another project of mine.

fs = require('fs');

var exports = module.exports;

exports.init = function(client) {
	console.log('FILTER INIT');
};

exports.ready = function(client) {
	console.log('FILTER READY');
};

exports.message = function(client, msg) {
	for (
		var i = 0;
		JSON.parse(fs.readFileSync('./addons/resources/profanityFilterWords.json')).phrases.length > i;
		i++
	) {
		removeSaying(
			JSON.parse(fs.readFileSync('./addons/resources/profanityFilterWords.json')).phrases[i].toUpperCase(),
			msg
		);
	}
};

exports.messageEdit = function(client, oldmsg, newmsg) {
	exports.message(client, newmsg);
};

const removeSaying = function(saying, msg) {
	if (msg.content.toUpperCase().includes(saying)) {
		msg.delete().catch((err) => {
			console.log('--ERROR in erasing filtered text in guild: ' + msg.guild.name);
			return;
		});

		msg
			.reply('Please do not say that word! Thank you! `@bot`')
			.then((message) => setTimeout(() => message.delete(), 6000));

		console.log(
			'Message: "' +
				saying +
				'"-"' +
				msg.content +
				'" has been said in ' +
				msg.guild.name +
				' - #' +
				msg.channel.name +
				' by ' +
				msg.author.username
		);
	}
};
