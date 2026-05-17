const { MessageFlags, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/Client');
const { time } = require('../../../functions');
const def = require('../../../defines');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Test The Embed.')
        .addStringOption(option => option
				.setName('tetle')
				.setDescription('The Title'))
        .addStringOption(option => option
				.setName('deskripsi')
				.setDescription('The deskripsi'))
		.addChannelOption(option => option
				.setName('channel')
				.setDescription('The channel to echo into')),
    options: {
        ownerOnly: true,
        developers: true
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
    	const descriptioni = interaction.options.getString('deskripsi') ?? 'No Description';
        const title = interaction.options.getString('tetle') ?? 'No Title';
        const chennelembed = interaction.options.getChannel('channel');
    
        const msgEmbed = new EmbedBuilder()
            .setTitle(title)
            .setThumbnail(def.icon.thumbnail)
            .setDescription(descriptioni)
            .setColor('Grey')
            .setFooter({ text: "Copyright (c) 2026 Noroshi Roleplay (All rights reserved).", iconURL: def.icon.thumbnail })
            .setTimestamp();

        chennelembed.send({ embeds: [msgEmbed] });
        return interaction.reply({ content: "Sukses Membuat Embed", flags: MessageFlags.Ephemeral });
    }
};
