const axios = require('axios');
const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();

// get addons -- Loader made by tbranyen

var addons = [];

var normalizedPath = require('path').join(__dirname, 'addons');

require('fs').readdirSync(normalizedPath).forEach(function(file) {
	if (file.substr(-3) == '.js') addons.push(require('./addons/' + file));
});

const guildId = process.env.GUILD_ID;
const giveRoleName = process.env.GIVE_ROLE_NAME;
const removeRoleName = process.env.REMOVE_ROLE_NAME;

addons.forEach((addon) => {
	if (addon.init) addon.init(client);
});

client.on('ready', () => {
	console.log('Logged in as ' + client.user.tag + '!');
	client.user.setActivity('uses of !verify', {
		type: 'WATCHING'
	});
	addons.forEach((addon) => {
		if (addon.ready) addon.ready(client);
	});
});

function createEmbeds(name, _id) {
	if (!_id) _id = null;
	return {
		checking: {
			embed: {
				title: '@' + name + ', Checking website...',
				description: '',
				url: undefined,
				color: 16777011,
				author: {
					name: 'Code Wizard',
					icon_url:
						'https://cdn.discordapp.com/avatars/623314619154300988/539bf23444c28b765923eb5b40e9f859.png',
					url: undefined
				},
				timestamp: undefined,
				fields: [],
				thumbnail: {
					url: 'https://cdn.discordapp.com/avatars/623314619154300988/539bf23444c28b765923eb5b40e9f859.png'
				},
				image: undefined,
				footer: {
					text: 'Code Wizard Verification Bot made by Razboy20',
					icon_url: undefined
				},
				file: undefined
			}
		},
		toverify: {
			embed: {
				title: '@' + name + ", Check DM's for more info.",
				description: 'Instructions will be posted there.',
				url: undefined,
				color: 16777011,
				author: {
					name: 'Code Wizard',
					icon_url:
						'https://cdn.discordapp.com/avatars/623314619154300988/539bf23444c28b765923eb5b40e9f859.png',
					url: undefined
				},
				timestamp: undefined,
				fields: [],
				thumbnail: {
					url: 'https://cdn.discordapp.com/avatars/623314619154300988/539bf23444c28b765923eb5b40e9f859.png'
				},
				image: undefined,
				footer: {
					text: 'Code Wizard Verification Bot made by Razboy20',
					icon_url: undefined
				},
				file: undefined
			}
		},
		isverifying: {
			embed: {
				title: '@' + name + ' started the verification process.',
				url: undefined,
				color: 16777011,
				author: {
					name: 'Code Wizard',
					icon_url:
						'https://cdn.discordapp.com/avatars/623314619154300988/539bf23444c28b765923eb5b40e9f859.png',
					url: undefined
				},
				timestamp: undefined,
				fields: [],
				image: undefined,
				footer: {
					text: 'Code Wizard Verification Bot made by Razboy20',
					icon_url: undefined
				},
				file: undefined
			}
		},
		toverifydm: {
			embed: {
				title: '@' + name + ', Please read the instructions below.',
				description:
					'To verify that you have a CodeWizardsHQ Account, \n\n1) go to one of your webpages on your **CodeWizards** editor and paste ```<id verificationnum="cw' +
					_id +
					'"/>``` somewhere on the page (preferably in the `<head>` tags if you have one). \n\n2) Afterwards, paste in the website link below in a DM replying to me.',
				url: undefined,
				color: 16777011,
				author: {
					name: 'Code Wizard',
					icon_url:
						'https://cdn.discordapp.com/avatars/623314619154300988/539bf23444c28b765923eb5b40e9f859.png',
					url: undefined
				},
				timestamp: undefined,
				fields: [],
				thumbnail: {
					url: 'https://cdn.discordapp.com/avatars/623314619154300988/539bf23444c28b765923eb5b40e9f859.png'
				},
				image: undefined,
				footer: {
					text: 'Code Wizard Verification Bot made by Razboy20',
					icon_url: undefined
				},
				file: undefined
			}
		},
		verified: {
			embed: {
				title: '@' + name + ', you are now Verified.',
				description: 'You now have your roles! Now get going and go do coding. \n\n\nShoo!\n',
				url: undefined,
				color: 63744,
				author: {
					name: 'Code Wizard',
					icon_url:
						'https://cdn.discordapp.com/avatars/623314619154300988/539bf23444c28b765923eb5b40e9f859.png',
					url: undefined
				},
				timestamp: undefined,
				fields: [],
				thumbnail: {
					url: 'https://cdn.discordapp.com/avatars/623314619154300988/539bf23444c28b765923eb5b40e9f859.png'
				},
				image: undefined,
				footer: {
					text: 'Code Wizard Verification Bot made by Razboy20',
					icon_url: undefined
				},
				file: undefined
			}
		},
		isverified: {
			embed: {
				title: '@' + name + ' was verified.',
				url: undefined,
				color: 63744,
				author: {
					name: 'Code Wizard',
					icon_url:
						'https://cdn.discordapp.com/avatars/623314619154300988/539bf23444c28b765923eb5b40e9f859.png',
					url: undefined
				},
				timestamp: undefined,
				fields: [],
				image: undefined,
				footer: {
					text: 'Code Wizard Verification Bot made by Razboy20',
					icon_url: undefined
				},
				file: undefined
			}
		},
		declined: {
			embed: {
				title: '@' + name + ', you are still NOT verified!',
				description:
					'An issue has occured. Please revisit the instructions and try again. You may have mistyped or something like that. Also, the page **HAS TO BE ON CODEWIZARDS**.',
				url: undefined,
				color: '16724736',
				author: {
					name: 'Code Wizard',
					icon_url:
						'https://cdn.discordapp.com/avatars/623314619154300988/539bf23444c28b765923eb5b40e9f859.png',
					url: undefined
				},
				timestamp: undefined,
				fields: [],
				thumbnail: {
					url: 'https://cdn.discordapp.com/avatars/623314619154300988/539bf23444c28b765923eb5b40e9f859.png'
				},
				image: undefined,
				footer: {
					text: 'Code Wizard Verification Bot made by Razboy20',
					icon_url: undefined
				},
				file: undefined
			}
		}
	};
}
client.on('message', (msg) => {
	try {
		addons.forEach((addon) => {
			if (addon.message) addon.message(client, msg);
		});
	} catch (err) {
		console.log(err);
	}

	if (msg.channel.type == 'text') {
		if (msg.channel.name != process.env.VERIFY_CHANNEL_NAME) {
			return;
		}

		if (msg.content == '!verify') {
			msg.channel.send(createEmbeds(msg.member.displayName).toverify).then(function(message) {
				setTimeout(() => {
					message.delete();
				}, 10000);
			});
			msg.guild.channels.cache
				.find((val) => val.name === 'verify-log')
				.send(createEmbeds(msg.member.displayName).isverifying);
			msg.author.send(createEmbeds(msg.author.username, msg.author.id).toverifydm);
		}
		if (msg.content == '!clear50') {
			msg.channel.bulkDelete(50).catch(console.error);
		}
		// if (msg.author.id == '250809865767878657') {
		// 	return;
		// }
		setTimeout(() => {
			msg.delete();
		}, 3000);
	}

	//checking if author is a bot
	if (msg.author.bot == true) {
		return;
	}

	if (msg.channel.type == 'dm') {
		msg.channel.send(createEmbeds(msg.author.username).checking).then(function(message) {
			if (!msg.content.includes('codewizardshq.com')) {
				message.edit(createEmbeds(msg.author.username).declined);
			} else {
				axios
					.get(msg.content)
					.catch(function(error) {
						message.edit(createEmbeds(msg.author.username).declined);
						console.error('Website does not exist.', error);
					})
					.then(function(response) {
						console.log(response);
						if (response.data.includes('cw' + msg.author.id)) {
							let role = client.guilds.cache
								.get(guildId)
								.roles.cache.find((role) => role.name === giveRoleName);
							client.guilds.cache
								.get(guildId)
								.members.cache.get(msg.author.id)
								.roles.add(role)
								.catch(console.error);

							let role2 = client.guilds.cache
								.get(guildId)
								.roles.cache.find((role) => role.name === removeRoleName);
							client.guilds
								.get(guildId)
								.members.get(msg.author.id)
								.roles.remove(role2)
								.catch(console.error);
							message.edit(createEmbeds(msg.author.username).verified);
							client.guilds.cache
								.get(guildId)
								.channels.cache.find((val) => val.name === 'verify-log')
								.send(createEmbeds(msg.author.username).isverified);
						} else {
							message.edit(createEmbeds(msg.author.username).declined);
						}
					});
			}
		});
		// msg.delete();
	}
});

client.on('guildMemberAdd', (member) => {
	member.send(
		'Welcome to the **Official CodeWizardsHQ** Discord! To get started, to go the #hall-of-upgrades channel and type in `!verify`.'
	);
});

client.on('messageUpdate', (oldmsg, newmsg) => {
	try {
		addons.forEach((addon) => {
			if (addon.messageEdit) addon.messageEdit(client, oldmsg, newmsg);
		});
	} catch (err) {
		console.log(err);
	}
});

client.login(process.env.SECRET_TOKEN).catch(() => {
	console.error(
		'\nERROR: Incorrect login details were provided. Please change the client login token to a valid token.\n'
	);
	process.exit();
});
