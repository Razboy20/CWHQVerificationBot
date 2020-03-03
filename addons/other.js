var exports = module.exports;

prefix = '-';

adminRoles = [ 'Mages', 'Moderator', 'Admin', 'Support troops' ];

exports.message = function(client, msg) {
	const command = msg.content.split(' ')[0].slice(prefix.length);

	if (msg.member.roles.cache.some((val) => val.name.containsAny(adminRoles))) {
		if (command === 'createInvite') {
			msg.channel
				.createInvite({ maxAge: 0, unique: true })
				.then(function(invite) {
					console.log(`Created an invite with a code of ${invite.code}`);
				})
				.catch(console.error);
		}
	}
};
