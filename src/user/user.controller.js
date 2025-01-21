import { query } from "../utils";

export async function createUser(req, res) {
    const { username, email, password } = req.body;
    try {
        const result = await query(
            `INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *`,
            [username, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (e) {
        res.status(500).send(e.message);
        console.log(e);
    }
}

export async function getUsers(req, res) { 
    try {
        const result = await query(`SELECT * FROM users`);
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
        const result = await query(`SELECT * FROM users WHERE id = $1`, [id]);
        res.status(200).json(result.rows[0]);
    } catch (e) {
        res.status(500).send(e.message);
        console.log(e);
    }
}

export async function updateUser(req, res) {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        const result = await query(
            `UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`,
            [username, email, password, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (e) {
        res.status(500).send(e.message);
        console.log(e);
    }
}

export async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const result = await query(`DELETE FROM users WHERE id = $1`, [id]);
        res.status(200).json(result.rows[0]);
    } catch (e) {
        res.status(500).send(e.message);
        console.log(e);
    }
}