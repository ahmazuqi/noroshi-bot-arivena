const { ButtonInteraction, ChatInputCommandInteraction, SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/Client');
const ms = require("ms");
const timeAccount = ms("0 days");
const NoroshiSQL = require('../../query');
const def = require('../../defines');
const { IntSucces, IntError }= require('../../functions');

module.exports = {
    customId: 'button-register',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const userid = interaction.user.id;
        const createdAt = new Date(interaction.user.createdAt).getTime()
        const detectDays = Date.now() - createdAt;

        if(detectDays < timeAccount) return IntError(interaction, "Umur akun anda tidak mencukupi untuk mendaftar Akun UCP di server Local Pride Roleplay!");
        NoroshiSQL.query(`SELECT * FROM whitelists WHERE discordid = '${userid}'`, async (err, row) => {
            if(err)
            {
                console.error(err);
                return IntError(interaction, "Terjadi kesalahan saat mengambil data dari database");
            }
            if (row.length < 1) {
                const modal = new ModalBuilder()
                    .setTitle('Pendaftaran User Control Panel')
                    .setCustomId('modal-register')
                    .addComponents(
                    new ActionRowBuilder()
                        .addComponents(
                        new TextInputBuilder()
                            .setLabel('Isi Nama UCP Anda Di Bawah Ini')
                            .setCustomId('reg-name')
                            .setPlaceholder('Nama User Control Panel Anda')
                            .setStyle(TextInputStyle.Short)
                            .setMinLength(4)
                            .setMaxLength(15)
                            .setRequired(true)
                    )
                );
                
                await interaction.showModal(modal);   
            }
            else return IntError(interaction, `**PENDAFTARAN AKUN | NOROSHI ROLEPLAY**\n:x: Error!\n\n> Anda sudah pernah mendaftar dengan nama **_${row[0].ucp}_** dan tidak bisa lagi mengambil tiket\n\n**#Mortal Roleplay**\n_~ MenyatukanSemua ~_`);
        });
    }
};