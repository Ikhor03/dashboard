import { Sequelize } from "sequelize";

const db = new Sequelize ('user_management', 'root', '', {
    host:'localhost',
    dialect:'mysql'
})

try {
    await db.authenticate();
    console.log('[database] Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default db;