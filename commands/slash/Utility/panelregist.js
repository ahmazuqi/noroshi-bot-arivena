const { MessageFlags, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/Client');
const def = require('../../../defines');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('panelregist')
        .setDescription('Test the handleregister handler.'),
    options: {
        ownerOnly: true,
        developers: true
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const msgEmbed = new EmbedBuilder()
            .setTitle("Noroshi Panel Account")
            .setThumbnail(def.icon.thumbnail)
            .setImage(def.icon.image)
            .setDescription(`:information_source: Di channel ini, kamu bisa mengatur akun UCP kamu. Berikut beberapa fitur yang tersedia:\n\n**__📮 Create UCP__**\n Tombol ini digunakan untuk mengambil Tiket (membuat akun UCP). Sebelum bermain di Noroshi Roleplay, kamu harus memiliki Tiket ini.\n\n**__🕵️ Cek UCP__**\n Kamu bisa melihat status Tiketmu, apakah sudah terverifikasi atau belum. Kamu juga bisa melihat kode verifikasi jika belum menerima DM dari BOT.\n\n**__♻️ Reff UCP__**\n Jika sudah mengambil Tiket tetapi tidak mendapatkan role <@&${def.idrole.ucp}>, gunakan tombol ini. Juga gunakan ini jika kamu keluar dari Discord Noroshi dan ingin kembali bermain, untuk mengambil kembali role <@&${def.idrole.ucp}>!\n\n**__❓ Reset Password__**\nTombol ini digunakan ketika kamu lupa password kamu dan ingin segera mereset password kamu`)
            .setColor('Grey')
            .setFooter({ text: "Copyright (c) 2026 Noroshi Roleplay (All rights reserved).", iconURL: def.icon.thumbnail })
            .setTimestamp();

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Registrasi')
                    .setStyle('Success')
                    .setCustomId('button-register')
                    .setEmoji("📮"),
                
                new ButtonBuilder()
                    .setLabel('Check Ucp')
                    .setStyle('Primary')
                    .setCustomId('button-resendcode')
                    .setEmoji("🕵️"),
                
                new ButtonBuilder()
                    .setLabel('Reff Role')
                    .setStyle('Secondary')
                    .setCustomId('button-reffrole')
                    .setEmoji("♻️"),

                new ButtonBuilder()
                    .setLabel('Reset Password')
                    .setStyle('Danger')
                    .setCustomId('button-reset')
                    .setEmoji('❓')
            );

        await interaction.channel.send({ embeds: [msgEmbed], components: [buttons] });
        return interaction.reply({ content: "Sukses Membuat Embed HandleRegister", flags: MessageFlags.Ephemeral });
    }
};
