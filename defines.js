module.exports = {
    client: {
        token: "MTUwNTUxMTU1MzcxNjE5MTMxMg.GosSAk._MWTutX74emTh2tiTZ_EOhn8PaT47YPZbeNoyw", //ganti pake token bot kalian
        id: "1505511553716191312", //ganti pake id bot kalian
        guild: "1381463694642249798", //ganti pake id server kalian
    },
    icon: {
        thumbnail: "https://i.imgur.com/SQBeSvx.png", // ini buat thumbnail di embed register dll
        image: "https://i.imgur.com/S3Kc7Ge.png", //ini buat gambar di embed register dll
    },
    mysql: {
        //mysql ini setting aja kaya biasa, connectionLimit gaperlu di ubah
        connectionLimit: 5,
        host: "localhost", 
        user: "root",
        password: "",
        database: "arivena",
    },
    idrole: {
        ucp: "1384394356848594945", // ganti jadi id role ucp kalian
    },
    handler: {
        prefix: "!", //prefix ini juga bisa di ganti semau kalian
        deploy: true,
        commands: {
            prefix: true,
            slash: true,
            user: true,
            message: true,
        }
    },
    users: {
        developers: "1100791469956137021", // ubah jadi user id akun dc kalian
        ownerId: "1100791469956137021", // ini juga ubah
    },
    development: {
        enabled: false,
    },
    messageSettings: {
        ownerMessage: "Pengembang bot memiliki satu-satunya izin untuk menggunakan perintah ini.",
        developerMessage: "Anda tidak berwenang untuk menggunakan perintah ini.",
        cooldownMessage: "Pelan-pelan sobat! Anda terlalu cepat untuk menggunakan perintah ini ({cooldown}s).",
        globalCooldownMessage: "Pelan-pelan sobat! Perintah ini berada pada cooldown global ({cooldown}s).",
        notHasPermissionMessage: "Anda tidak memiliki izin untuk menggunakan perintah ini.",
        notHasPermissionComponent: "Anda tidak memiliki izin untuk menggunakan komponen ini.",
        missingDevIDsMessage: "Ini adalah perintah khusus pengembang, tetapi tidak dapat dijalankan karena ID pengguna tidak ada di file konfigurasi."
    }
};
