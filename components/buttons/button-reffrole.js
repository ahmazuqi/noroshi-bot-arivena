const { ButtonInteraction } = require('discord.js');
const ExtendedClient = require('../../class/Client');
const def = require('../../defines');
const { IntSucces, IntError }= require('../../functions');
const NoroshiSQL = require('../../query');

module.exports = {
    customId: 'button-reffrole',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const userid = interaction.user.id;

        NoroshiSQL.query(`SELECT * FROM whitelists WHERE discordid = '${userid}'`, async (err, row) => {
            if (row[0]) {
                const rUCP = await interaction.guild.roles.cache.get(def.idrole.ucp);

                if (!interaction.member.permissions.has("ADMINISTRATOR")) {
                    interaction.member.roles.add(rUCP);
                    interaction.member.setNickname(`CITIZEN | ${row[0].ucp}`);
                }

                IntSucces(interaction, `**REFF ROLE | EXERCISE ROLEPLAY**\n:white_check_mark: **Berhasil!**\n\n> Akun Discord Anda berhasil kami verifikasi sebagai pemain di **Noroshi Roleplay**.\n> Mohon untuk tidak keluar lagi dari Discord **Noroshi Roleplay**.\n\n**#NoroshiRoleplay**`);
            } else {
                IntError(interaction, `**REFF ROLE | EXERCISE ROLEPLAY**\n:x: **ERROR!** \n\n> Anda belum pernah mendaftar/ambil tiket di **Noroshi Roleplay**. Silakan ambil tiket terlebih dahulu.\n\n**#NoroshiRoleplay**`);
            }
        });
    }
};
