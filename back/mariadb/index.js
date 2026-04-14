import { Sequelize } from 'sequelize';
import { ENV_IP } from '../utils/env.js';
const sequelize = new Sequelize(process.env.dbName || '_VISUAL', 'root', 'root', {
    dialect: 'mariadb',
    logging: console.log,
    host: process.env.mariadb || ENV_IP,
    pool: {
        max: 10
    },
    dialectOptions: {
        allowPublicKeyRetrieval: true
    }
})


async function init() {
    await sequelize.sync({
        alter: true
    })
    console.log("成功创建/存在表格");
}

export { sequelize, init }