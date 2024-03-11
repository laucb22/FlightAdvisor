import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Cities from "./cityModel.js";

const { DataTypes } = Sequelize;

const Routes = db.define("routes", {
    
    transit: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weather: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    animals: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: false,
    timestamps: false
});

(async () => {
    await db.sync();
})();

Cities.belongsToMany(Cities, { through: Routes, as: "city2"});


export default Routes;