const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'postgres',
    port: 5432,
    database: 'botilleria'
});

module.exports = pool;