const {
    client,
    getAllUsers
} = require('./index');

const dropTables = async () => {
    try {
        console.log("Starting to drop tables...");

        await client.query(`
        DROP TABLE IF EXISTS users
        `);

        console.log("Finnished dropping tables!")
    } catch (error) {
        console.error("Error dropping tables!");
        throw error;
    }
}

const createTables = async () => {
    try {
        console.log("Starting to build tables...");

        await  client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username varchar (255) UNIQUE NOT NULL,
            password varchar (255) UNIQUE NOT NULL
        )
        `);
        console.log("Finished Building Tables!")
    } catch (error) {
        console.error("Error Building Tables!");
        throw error;
    }
}

const rebuildDB = async () => {
    try {
     client.connect();
     
     await dropTables();
     await createTables();
    } catch (error) {
        throw error;
    }
}

const testDB = async () => {
    try {
        console.log('Starting to test database...');

        const users = await getAllUsers();
        console.log("Finished database tests!");
    } catch (error) {
        console.error("Error testing database!");
        throw error;
    }
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());