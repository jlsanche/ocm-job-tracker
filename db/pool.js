import pg from 'pg';
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
})


export default pool;