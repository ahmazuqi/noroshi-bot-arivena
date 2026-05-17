const { ChannelType, Message, MessageFlags } = require("discord.js");
const def = require("../../defines");
const { log } = require("../../functions");
const ExtendedClient = require("../../class/Client");

const cooldown = new Map();

module.exports = {
    event: "messageCreate",
    /**
     *
     * @param {ExtendedClient} client
     * @param {Message<true>} message
     * @returns
     */
    run: async (client, message) => {
        if (message.author.bot || message.channel.type === ChannelType.DM) return;

        if (!def.handler.commands.prefix) return;

        let prefix = def.handler.prefix;

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandInput = args.shift().toLowerCase();

        if (!commandInput.length) return;

        let command =
            client.collection.prefixcommands.get(commandInput) ||
            client.collection.prefixcommands.get(
                client.collection.aliases.get(commandInput)
            );

        if (command) {
            try {
                if (command.structure?.ownerOnly) {
                    if (message.author.id !== def.users.ownerId) {
                        await message.reply({
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

                if (
                    command.structure?.permissions &&
                    !message.member.permissions.has(command.structure?.permissions)
                ) {
                    await message.reply({
                        content:
                            def.messageSettings.notHasPermissionMessage !== undefined &&
                                def.messageSettings.notHasPermissionMessage !== null &&
                                def.messageSettings.notHasPermissionMessage !== ""
                                ? def.messageSettings.notHasPermissionMessage
                                : "You do not have the permission to use this command.",
                        flags: MessageFlags.Ephemeral
                    });

                    return;
                }


                if (command.structure?.nsfw && !message.channel.nsfw) {
                    await message.reply({
                        content:
                            def.messageSettings.nsfwMessage !== undefined &&
                                def.messageSettings.nsfwMessage !== null &&
                                def.messageSettings.nsfwMessage !== ""
                                ? def.messageSettings.nsfwMessage
                                : "The current channel is not a NSFW channel.",
                        flags: MessageFlags.Ephemeral
                    });

                    return;
                }

                if (command.structure?.cooldown) {
                    const cooldownFunction = () => {
                        let data = cooldown.get(message.author.id);

                        data.push(commandInput);

                        cooldown.set(message.author.id, data);

                        setTimeout(() => {
                            let data = cooldown.get(message.author.id);

                            data = data.filter((v) => v !== commandInput);

                            if (data.length <= 0) {
                                cooldown.delete(message.author.id);
                            } else {
                                cooldown.set(message.author.id, data);
                            }
                        }, command.structure?.cooldown);
                    };

                    if (cooldown.has(message.author.id)) {
                        let data = cooldown.get(message.author.id);

                        if (data.some((v) => v === commandInput)) {
                            await message.reply({
                                content:
                                    (def.messageSettings.cooldownMessage !== undefined &&
                                        def.messageSettings.cooldownMessage !== null &&
                                        def.messageSettings.cooldownMessage !== ""
                                        ? def.messageSettings.cooldownMessage
                                        : "Slow down buddy! You're too fast to use this command ({cooldown}s).").replace(/{cooldown}/g, command.structure.cooldown / 1000),
                                flags: MessageFlags.Ephemeral
                            });

                            return;
                        } else {
                            cooldownFunction();
                        }
                    } else {
                        cooldown.set(message.author.id, [commandInput]);

                        cooldownFunction();
                    }
                }

                command.run(client, message, args);
            } catch (error) {
                log(error, "err");
            }
        }
    },
};
