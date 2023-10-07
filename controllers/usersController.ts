import { Request, Response } from "express";
import { User } from "../models/User";
import { Op } from "sequelize";
import { sequelize } from "../db/config";

export async function searchUsers(req: Request, res: Response) {
    try {
        const searchTerm = req.query.q ? String(req.query.q) : "";

        if (!searchTerm) {
            return res.status(400).json({
                message: "Please provide a search term using the ?q= parameter."
            });
        }

        const users = await User.findAll({
            where: {
                [Op.or]: [
                    sequelize.where(
                        sequelize.fn("lower", sequelize.col("name")),
                        "LIKE",
                        `%${searchTerm.toLowerCase()}%`
                    ),
                    sequelize.where(
                        sequelize.fn("lower", sequelize.col("city")),
                        "LIKE",
                        `%${searchTerm.toLowerCase()}%`
                    ),
                    sequelize.where(
                        sequelize.fn("lower", sequelize.col("country")),
                        "LIKE",
                        `%${searchTerm.toLowerCase()}%`
                    ),
                    sequelize.where(
                        sequelize.fn("lower", sequelize.col("favorite_sport")),
                        "LIKE",
                        `%${searchTerm.toLowerCase()}%`
                    )
                ]
            }
        });

        if (users.length == 0) {
            return res
                .status(404)
                .json({ message: `No user found with name ${searchTerm}` });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error while searching for users:", error);
        return res
            .status(500)
            .json({ message: "Error while searching for users." });
    }
}
