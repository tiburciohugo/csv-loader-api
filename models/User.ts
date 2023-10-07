import { DataTypes } from "sequelize";
import { sequelize } from "../db/config";

export const User = sequelize.define("User", {
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    favorite_sport: DataTypes.STRING
});
