const { MessageFlags, ButtonInteraction, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../class/Client');
const NoroshiSQL = require('../../query');
const { IntSucces, IntError } = require('../../functions');

module.exports = {
    customId: 'button-reset',

    /**
     * @param {ExtendedClient} client
     * @param {ButtonInteraction} interaction
     */
    run: async (client, interaction) => {
        try {
            const userId = interaction.user.id;
            const randCode = Math.floor(100000 + Math.random() * 900000);

            const query = `SELECT * FROM whitelists WHERE discordid = '${userId}'`;

            NoroshiSQL.query(query, async (error, results) => {
                if (error) {
                    console.error(error);
                    return IntError(interaction, ":x: **ERROR**\nTerjadi kesalahan saat mengambil data akun.");
                }

                if (!results || results.length < 1) {
                    return IntError(interaction, ":x: **ERROR**\nAnda belum pernah mengambil tiket di Noroshi Roleplay.");
                }

                const data = results[0];

                const msgEmbed = new EmbedBuilder()
                    .setAuthor({ name: "PEMULIHAN AKUN | NOROSHI ROLEPLAY" })
                    .setDescription(`:warning: **Peringatan!**\nAnda telah meminta reset password.\n\n**Kode Pemulihan**\n\`\`\`${randCode}\`\`\`\nMasuklah ke server dan gunakan kode ini untuk membuat password baru.`)
                    .setColor('Green')
                    .setFooter({ text: interaction.guild.name })
                    .setTimestamp();

                try {
                    await interaction.user.send({ embeds: [msgEmbed] });
                } catch (sendError) {
                    console.error(sendError);
                    return interaction.reply({
                        content: "Tidak dapat mengirim DM. Silakan aktifkan Direct Message terlebih dahulu.",
                        flags: MessageFlags.Ephemeral
                    });
                }

                await NoroshiSQL.query(`UPDATE player_ucp SET Password = '' WHERE UCP = '${data.ucp}'`);
                await NoroshiSQL.query(`UPDATE whitelists SET verify = '${randCode}' WHERE discordid = '${userId}'`);

                return IntSucces(interaction, "**PEMULIHAN AKUN | NOROSHI ROLEPLAY**\n:white_check_mark: Berhasil! Kode pemulihan telah dikirim ke DM Anda.");
            });

        } catch (error) {
            console.error(error);
            return IntError(interaction, ":x: **ERROR**\nTerjadi kesalahan dalam memproses permintaan.");
        }
    }
};