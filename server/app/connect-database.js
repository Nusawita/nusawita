const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "nusawita",
    password: "azerblaze195",
    port: 5432
})

module.exports = pool