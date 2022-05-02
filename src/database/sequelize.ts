const { Sequelize } = require('sequelize');
const environment = require('../../config/config');

require('dotenv').config();

if (!process.env.APP_ENVIRONMENT) {
    throw new Error("Selecione o Ambiente de desenvolvimento");
}
//Selects connection according to the environment
let connection = environment[process.env.APP_ENVIRONMENT];

// Connection
const sequelize = new Sequelize(connection)

export default sequelize;