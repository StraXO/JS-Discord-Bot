var pg = require('pg');

var pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL.parse,
  port: 5432,
  host: process.env.dbhost,
  database: process.env.db,
  user: process.env.user,
  password: process.env.password,
  ssl: true,
});

module.exports = pool;
