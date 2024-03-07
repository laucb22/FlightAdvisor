import { Sequelize } from "sequelize";

const db = new Sequelize("flightadvisor", "root", "YouCan", {
    host: "localhost",
    dialect: "mysql"
});

export default db;