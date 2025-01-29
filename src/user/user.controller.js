import { queryDatabase } from "../utils.js";

/**
 * Creates a new user in the database.
 * 
 * @param {express.Request} req - The request object, containing the user data in the body.
 * @param {express.Response} res - The response object, used to send the response back to the client.
 * @returns {Promise<void>} - A promise that resolves when the user is created.
 */
export async function createUser(req, res) {
    const { username, email, password } = req.body;
    try {
        const result = await queryDatabase(
            `INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *`,
            [email, username, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (e) {
        console.error('Error creating user:', e);
        res.status(500).send(e.message);
    }
}

/**
 * Gets all users from the database.
 * 
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object, used to send the response back to the client.
 * @returns {Promise<void>} - A promise that resolves with the users.
 */
export async function getUsers(req, res) {
  try {
    const result = await queryDatabase(`SELECT * FROM users`);
    res.status(200).json(result.rows);
  } catch (e) {
    res.status(500).send(e.message);
    console.log(e);
  }
}

// Endpoints that require id
export async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await queryDatabase(`SELECT * FROM users WHERE id = $1`, [
      id,
    ]);
    res.status(200).json(rows[0]);
  } catch (e) {
    res.status(500).send(e.message);
    console.log(e);
  }
}

//TODO: figure out a more elegant way to build the query 😒
export async function updateUser(req, res) {
  const { id } = req.params;
  const updatedData = req.body;
  const query = `UPDATE users SET email = $1, username = $2, password = $3 WHERE id = $4 RETURNING *`;

  try {
    const currentData = await queryDatabase('SELECT * FROM users WHERE id = $1', [id]);
    const { email, username, password } = { ...currentData.rows[0], ...updatedData };
    const values = [email, username, password, id];
    
    const result  = await queryDatabase(query, values);
    res.status(200).json(result.rows[0]);
 } catch (e) {
    res.status(500).send(e.message);
    console.log(e);
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const result = await queryDatabase(`DELETE FROM users WHERE id = $1`, [id]);
    res.status(200).json("User deleted");
  } catch (e) {
    res.status(500).send(e.message);
    console.log(e);
  }
}
