const {MessageFlags} = require('discord.js');
const def = require("../../defines");
const { log } = require("../../functions");
const ExtendedClient = require("../../class/Client");

const cooldown = new Map();

module.exports = {
    event: "interactionCreate",
    /**
     *
     * @param {ExtendedClient} client
     * @param {import('discord.js').Interaction} interaction
     * @returns
     */
    run: async (client, interaction) => {
        if (!interaction.isCommand()) return;

        if (
            def.handler.commands.slash === false &&
            interaction.isChatInputCommand()
        )
            return;
        if (
            def.handler.commands.user === false &&
            interaction.isUserContextMenuCommand()
        )
            return;
        if (
            def.handler.commands.message === false &&
            interaction.isMessageContextMenuCommand()
        )
            return;

        const command = client.collection.interactioncommands.get(
            interaction.commandName
        );

        if (!command) return;

        try {
            if (command.options?.ownerOnly) {
                if (interaction.user.id !== def.users.ownerId) {
                    await interaction.reply({
                        content:
                            def.messageSettings.ownerMessage !== undefined &&
                                def.messageSettings.ownerMessage !== null &&
                                def.messageSettings.ownerMessage !== ""
                                ? def.messageSettings.ownerMessage
                                : "The bot developer has the only permissions to use this command.",
                        flags: MessageFlags.Ephemeral
                    });

                    return;
                }
            }

            if (command.options?.developers) {
                if (
                    def.users?.developers?.length > 0 &&
                    !def.users?.developers?.includes(interaction.user.id)
                ) {
                    await interaction.reply({
                        content:
                            def.messageSettings.developerMessage !== undefined &&
                                def.messageSettings.developerMessage !== null &&
                                def.messageSettings.developerMessage !== ""
                                ? def.messageSettings.developerMessage
                                : "You are not authorized to use this command",
                        flags: MessageFlags.Ephemeral,
                    });

                    return;
                } else if (def.users?.developers?.length <= 0) {
                    await interaction.reply({
                        content:
                            def.messageSettings.missingDevIDsMessage !== undefined &&
                                def.messageSettings.missingDevIDsMessage !== null &&
                                def.messageSettings.missingDevIDsMessage !== ""
                                ? def.messageSettings.missingDevIDsMessage
                                : "This is a developer only command, but unable to execute due to missing user IDs in configuration file.",

                        flags: MessageFlags.Ephemeral,
                    });

                    return;
                }
            }

            if (command.options?.nsfw && !interaction.channel.nsfw) {
                await interaction.reply({
                    content:
                        def.messageSettings.nsfwMessage !== undefined &&
                            def.messageSettings.nsfwMessage !== null &&
                            def.messageSettings.nsfwMessage !== ""
                            ? def.messageSettings.nsfwMessage
                            : "The current channel is not a NSFW channel",

                    flags: MessageFlags.Ephemeral,
                });

                return;
            }

            if (command.options?.cooldown) {
                const isGlobalCooldown = command.options.globalCooldown;
                const cooldownKey = isGlobalCooldown ? 'global_' + command.structure.name : interaction.user.id;
                const cooldownFunction = () => {
                    let data = cooldown.get(cooldownKey);

                    data.push(interaction.commandName);

                    cooldown.set(cooldownKey, data);

                    setTimeout(() => {
                        let data = cooldown.get(cooldownKey);

                        data = data.filter((v) => v !== interaction.commandName);

                        if (data.length <= 0) {
                            cooldown.delete(cooldownKey);
                        } else {
                            cooldown.set(cooldownKey, data);
                        }
                    }, command.options.cooldown);
                };

                if (cooldown.has(cooldownKey)) {
                    let data = cooldown.get(cooldownKey);

                    if (data.some((v) => v === interaction.commandName)) {
                        const cooldownMessage = (isGlobalCooldown
                            ? def.messageSettings.globalCooldownMessage ?? "Slow down buddy! This command is on a global cooldown ({cooldown}s)."
                            : def.messageSettings.cooldownMessage ?? "Slow down buddy! You're too fast to use this command ({cooldown}s).").replace(/{cooldown}/g, command.options.cooldown / 1000);

                        await interaction.reply({
                            content: cooldownMessage,
                            flags: MessageFlags.Ephemeral,
                        });

                        return;
                    } else {
                        cooldownFunction();
                    }
                } else {
                    cooldown.set(cooldownKey, [interaction.commandName]);
                    cooldownFunction();
                }
            }

            command.run(client, interaction);
        } catch (error) {
            log(error, "err");
        }
    },
};