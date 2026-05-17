const { REST, Routes } = require("discord.js");
const { log, isSnowflake } = require("../functions");
const def = require("../defines");
const ExtendedClient = require("../class/Client");

/**
 *
 * @param {ExtendedClient} client
 */
module.exports = async (client) => {
    const rest = new REST({ version: "10" }).setToken(
        def.client.token
    );

    try {
        log("Started loading application commands... (this might take minutes!)", "info");

        const guildId = def.client.guild;

        if (def.development && def.development.enabled && guildId) {
            if (!isSnowflake(guildId)) {
                log("Guild ID is missing. Please set it in .env or def file or disable development in the def", "err");
                return;
            };

            await rest.put(
                Routes.applicationGuildCommands(def.client.id, guildId), {
                    body: client.applicationcommandsArray,
                }
            );

            log(`Successfully loaded application commands to guild ${guildId}.`, "done");
        } else {
            await rest.put(
                Routes.applicationCommands(def.client.id), {
                    body: client.applicationcommandsArray,
                }
            );

            log("Successfully loaded application commands globally to Discord API.", "done");
        }
    } catch (e) {
        log(`Unable to load application commands to Discord API: ${e.message}`, "err");
    }
};
