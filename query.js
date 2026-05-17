const MySQL = require("mysql");
const def = require('./defines');

let NoroshiSQL = MySQL.createPool(def.mysql)
NoroshiSQL.getConnection((err, connect) => {
    if(connect) return console.log("\x1b[36m[MYSQL]: \x1b[0mDatabase MySql telah berhasil terhubung!");
    console.log("\x1b[36m[MYSQL]: \x1b[0mDatabase MySql tidak dapat terhubung!")
})

module.exports = NoroshiSQL;