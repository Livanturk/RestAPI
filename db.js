// Desc: Database connection
const Pool = require("pg").Pool;

//db connection
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "students",
    password: "Elifnaz1.",
    port: 5432
});

//exporting pool
module.exports = pool;