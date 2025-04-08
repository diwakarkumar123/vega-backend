require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
});

const testDbConnection = async () => {
  console.log(DB_HOST, DB_NAME, DB_PASS);

  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false, alter: false });

    console.log('✅ Connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

module.exports = { sq: sequelize, testDbConnection };

// require('dotenv').config();
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: 'mysql',
//   logging: false,
// });


// const testDbConnection = async () => {
//   console.log({
//     DB_HOST: process.env.DB_HOST,
//     DB_PORT: process.env.DB_PORT,
//     DB_USER: process.env.DB_USER,
//     DB_NAME: process.env.DB_NAME,
//   });
//   try {
//     await sequelize.authenticate();
//     await sequelize.sync({ force: false, alter: false });
//     console.log('✅ DB connected!');
//   } catch (err) {
//     console.error('❌ DB Error:', err);
//   }
// };

// module.exports = { sq: sequelize, testDbConnection };
