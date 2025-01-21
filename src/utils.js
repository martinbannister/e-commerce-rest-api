import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Connects to the client and runs the query, then releases the client.
 * @param {string} query - The SQL query string with placeholders ($1, $2, etc.).
 * @param {Array} values - The values to insert into the query.
 * @returns {Promise} - A promise that resolves to the result of the query.
 * @example
 * const result = await query(`SELECT * FROM users WHERE username = $1`, ['johndoe']);
 */
export async function query(query, values) {
  const client = await pool.connect();
  try {
    const result = await client.query(query, values);
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    client.release();
  }
}