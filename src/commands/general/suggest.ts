import Command, { SendFunction } from '../../util/BaseCommand';
import SentinelClient from '../../client/SentinelClient';
import { Message } from 'discord.js';
import CommandArguments from '../../util/CommandArguments';
import CommandError from '../../structures/CommandError';
import Util from '../../util';

export default class SuggestCommand extends Command {
	constructor(client: SentinelClient) {
		super(client, {
			aliases: [],
			name: 'suggest',
			dmAllowed: true,
			description: 'Give the Sentinel Developers a suggestion!'
		}, __filename);
	}

	async run(message: Message, args: CommandArguments, send: SendFunction) {
		if (!args[0]) throw new CommandError('PROVIDE_SUGGESTION');
		const suggestion = args.join(' ');
		if (suggestion.length >= 1024) throw new CommandError('SUGGESTION_LENGTH');
		await send('SUGGESTION_RESPONSE');
		await Util.respondWith(this.client.config.suggestionsChannel!, 'SUGGESTION_LOG', message.author, suggestion);
	}
}
