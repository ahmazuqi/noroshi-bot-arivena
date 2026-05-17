const { MessageFlags, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../class/Client');
const NoroshiSQL = require('../../query');
const def = require('../../defines');
const { IntSucces, IntError }= require('../../functions');

module.exports = {
    customId: 'modal-register',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {
        const userid = interaction.user.id;
        const inputName = interaction.fields.getTextInputValue('reg-name');
        var randCode = Math.floor(100000 + Math.random() * 900000);

        if(inputName.includes("_")) return IntError(interaction, "Nama akun User Control Panel tidak boleh mengandung simbol \"_\"");
        if(inputName.includes(" ")) return IntError(interaction, "Nama akun User Control Panel tidak boleh mengandung spasi");
        if(!/^[a-z]+$/i.test(inputName)) return IntError(interaction, "Nama akun User Control Panel tidak boleh mengandung simbol atau angka!");

        NoroshiSQL.query(`SELECT * FROM whitelists WHERE ucp = '${inputName}'`, async (err, row) => {
            if (row.length < 1) {
                await NoroshiSQL.query(`INSERT INTO whitelists SET ucp = '${inputName}', discordid = '${userid}', verify = '${randCode}'`);
                const msgEmbed = new EmbedBuilder()
                    .setAuthor({ name: "PENGAMBILAN TIKET UCP | NOROSHI ROLEPLAY", iconURL: def.icon.thumbnail })
                    .setDescription(`Yang terhormat, **${inputName}**,\n\nPengambilan Tiket berhasil. Gunakan UCP untuk login ke dalam server! Masuklah ke dalam server dan masukkan kode verifikasi di bawah!\n\n**UCP**: ${inputName}\n\n**Kode Verifikasi**: ${randCode}\n\n**Waktu Pendaftaran**: <t:${Math.round(Date.now() / 1000)}:R>`)
                    .setColor('Green')
                    .setImage(def.icon.image)
                    .setFooter({ text: interaction.guild.name })
                    .setTimestamp();

                await interaction.user.send({ embeds: [msgEmbed] }).catch(error => {
                    interaction.reply({
                        content: "Tidak dapat mengirimkan kode/pin verifikasi akun UCP Anda. Silakan gunakan perintah /resendcode jika sudah mengikuti instruksi berikut:\n- Instruksi Membuka Pesan Langsung -\n• Tips Pertama: Pergi ke Pengaturan Discord\n• Tips Kedua: Pilih Privacy & Safety\n• Tips Ketiga: Pilih Do Not Scan",
                        flags: MessageFlags.Ephemeral
                    });
                });

                console.log(`[BOT]: User (${interaction.user.tag}) berhasil mendaftarkan akun UCP dengan nama (${inputName}) dan pin (${randCode})`);
                IntSucces(interaction, `**PENGAMBILAN TIKET UCP | NOROSHI ROLEPLAY**\n:white_check_mark: **Berhasil!**\n\n> Pendaftaran akun UCP berhasil, silakan buka DM dari bot Noroshi Roleplay!\n\n**#NoroshiRoleplay**\n_~Menyatukan Semua~_`);

                const rUCP = await interaction.guild.roles.cache.get(def.idrole.ucp);

                if (!interaction.member.permissions.has("ADMINISTRATOR")) {
                    const guildMember = await interaction.guild.members.fetch(interaction.member.id);
                    interaction.member.roles.add(rUCP);
                    interaction.member.setNickname(`CITIZEN | ${inputName}`);
                }
            } else {
                return IntError(interaction, "Maaf, nama akun yang Anda input telah terdaftar. Silakan coba nama akun yang lain!");
            }
        });
    }
};
