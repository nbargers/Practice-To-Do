const { Pool } = require('pg');

const PG_URI = 'postgres://gzophewp:1Azk39zzbfl794xSxoqCs6v8_BeecPBA@ziggy.db.elephantsql.com:5432/gzophewp';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

module.exports = pool;