const { Sequelize } = require('sequelize');

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

// (CY): Using sequelize app
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mssql',
});

// (CY): Connecting to the local DB server
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testDatabaseConnection();

module.exports = sequelize;
