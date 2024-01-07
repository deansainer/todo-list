require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: 'postgres',
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: "todo_app",
});

module.exports = pool;
