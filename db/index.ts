import fs from "fs";
import { sequelize } from "./config";
import { User } from "../models/User";

export async function initializeDatabase() {
    const dbDir = "./db";
    const dbPath = `${dbDir}/database.sqlite`;

    if (!fs.existsSync(dbDir)) {
        console.log("Creating db directory");
        fs.mkdirSync(dbDir);
    }

    if (!fs.existsSync(dbPath)) {
        console.log("Creating SQLite database file");
        fs.writeFileSync(dbPath, "");
    }

    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        await User.sync();

        const userCount = await User.count();
        if (userCount === 0) {
            await User.bulkCreate([
                {
                    name: "User1",
                    city: "City1",
                    country: "Country1",
                    favorite_sport: "Sport1"
                },
                {
                    name: "User2",
                    city: "City2",
                    country: "Country2",
                    favorite_sport: "Sport2"
                },
                {
                    name: "User3",
                    city: "City3",
                    country: "Country3",
                    favorite_sport: "Sport3"
                },
                {
                    name: "User4",
                    city: "City4",
                    country: "Country4",
                    favorite_sport: "Sport4"
                }
            ]);
            console.log("Dummy users added to the database.");
        }
    } catch (error) {
        console.error("Unable to setup the database:", error);
        process.exit(1);
    }
}
