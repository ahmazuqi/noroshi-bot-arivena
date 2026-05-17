const { Client, Partials, Collection, GatewayIntentBits } = require("discord.js");
const def = require('../defines');
const commands = require("../handlers/commands");
const events = require("../handlers/events");
const deploy = require("../handlers/deploy");
const components = require("../handlers/components");

module.exports = class extends Client {
    collection = {
        interactioncommands: new Collection(),
        prefixcommands: new Collection(),
        aliases: new Collection(),
        components: {
            buttons: new Collection(),
            selects: new Collection(),
            modals: new Collection(),
            autocomplete: new Collection()
        }
    };
    applicationcommandsArray = [];

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
            ],
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
                Partials.Reaction,
                Partials.User,
                Partials.ThreadMember
            ],
            presence: {
                activities: [{
                    name: 'something goes here',
                    type: 4,
                    state: 'Noroshi Roleplay | Indonesia'
                }]
            }
        });
    };

    start = async () => {
        commands(this);
        events(this);
        components(this);

        await this.login(def.client.token);

        if (def.handler.deploy) deploy(this, def);
    };
};