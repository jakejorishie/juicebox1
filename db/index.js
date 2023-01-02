const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/juicebox-dev1');

const createUser = async ({username, password}) => {
    try {
        const result = await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1, $2);
        `, [username, password]);

        return result;
    } catch (error) {
        throw error;
    }
}


const getAllUsers = async () => {
    const { rows } = await client.query(
        `SELECT id, username
        FROM users;
        `);
        return rows;
}

module.exports = {
    client,
    getAllUsers,
    createUser
}