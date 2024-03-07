import {Sequelize} from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Cities = db.define("cities", {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName:true,
    timestamps: false
});

(async () => {
    await db.sync();
})();

export default Cities;